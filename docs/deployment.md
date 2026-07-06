# Deployment Guide

`main` 브랜치 push 시 GitHub Actions 가 자동으로 빌드 → S3 배포 → CloudFront 무효화 한다.
워크플로우: [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)

## 인프라 구성

```
[GitHub] ──push(main)──> [GitHub Actions] ──build──> [S3]
                               │                       │
                               │ invalidate            │ origin
                               ▼                       ▼
                         [CloudFront] ◄────────────────
                               │ HTTPS
                               ▼
                             [User]
```

| 영역 | 구성 |
|------|------|
| Static Hosting | AWS S3 (`woongdream-frontend`, `ap-northeast-2`) |
| CDN | AWS CloudFront (`EA0PBGP70O1EZ`) |
| Build | Vite (TypeScript + React), Node 22 (`.nvmrc`) |
| CI/CD | GitHub Actions (`main` push + 수동 `workflow_dispatch`) |
| AWS Account | `800460064485` |

## CI/CD 흐름

```
git push origin main   (또는 Actions 탭에서 수동 실행)
        ▼
GitHub Actions (ubuntu-latest, concurrency=deploy-frontend, 중복 배포 취소)
  ├─ actions/setup-node@v4 (node-version-file: .nvmrc → 22, cache: npm)
  ├─ npm ci
  ├─ npm run build            (→ dist/)
  ├─ configure-aws-credentials@v4 (region ap-northeast-2)
  ├─ S3 sync (정적 에셋 1년 immutable, index.html·*.map 제외, --delete)
  ├─ S3 cp index.html (no-cache)
  └─ CloudFront create-invalidation (/*)
```

## GitHub Secrets

리포지토리 Settings → Secrets 에 등록되어 있어야 한다 (등록 완료).

| 변수 | 값 / 설명 |
|------|-----------|
| `AWS_ACCESS_KEY_ID` | 배포용 IAM Access Key |
| `AWS_SECRET_ACCESS_KEY` | 배포용 IAM Secret Key |
| `S3_BUCKET_NAME` | `woongdream-frontend` |
| `CLOUDFRONT_DISTRIBUTION_ID` | `EA0PBGP70O1EZ` |

## 캐시 전략

| 파일 | Cache-Control | 이유 |
|------|---------------|------|
| `assets/*.js`, `*.css`, 이미지 | `public, max-age=31536000, immutable` | Vite 가 파일명에 해시 포함 → 1년 캐시 안전 |
| `index.html` | `public, max-age=0, must-revalidate` | 매번 검증 → 새 배포 즉시 반영 |
| `*.map` | 업로드 제외 | 소스맵 노출 방지 |

배포는 2-pass: ① `aws s3 sync --delete` 로 정적 에셋을 immutable 캐시로 올리며 `index.html`·`*.map` 제외 → ② `aws s3 cp` 로 `index.html` 만 no-cache 로 재업로드. 매 배포마다 CloudFront `/*` 무효화.

## SPA 라우팅 (CloudFront 인프라 설정 — 확인 사항)

React Router 클라이언트 라우팅을 위해 CloudFront **에러 응답** 설정이 필요하다 (워크플로우가 아니라 배포판 설정).

| HTTP 코드 | 응답 | 응답 코드 |
|-----------|------|----------|
| 403 | `/index.html` | 200 |
| 404 | `/index.html` | 200 |

→ S3 에 없는 경로(`/foo` 등)도 `index.html` 반환 → React Router 가 처리. 이 설정이 없으면 새로고침 시 403/404 가 난다.

## 수동 배포 (긴급 시)

```bash
npm run build
aws s3 sync ./dist s3://woongdream-frontend --delete \
  --cache-control "public,max-age=31536000,immutable" --exclude "index.html" --exclude "*.map"
aws s3 cp ./dist/index.html s3://woongdream-frontend/index.html \
  --cache-control "public,max-age=0,must-revalidate" --content-type "text/html"
aws cloudfront create-invalidation --distribution-id EA0PBGP70O1EZ --paths "/*"
```

## 트러블슈팅

- **배포 후 화면 안 바뀜** → CloudFront 무효화 진행 중(1~2분) 또는 브라우저 캐시. 시크릿 창/강력 새로고침.
- **새로고침 시 404** → CloudFront 403·404 에러 응답 설정 누락 (SPA 라우팅 섹션).
- **Actions 빌드에서 rolldown binding 오류** → `package-lock.json` 에 Linux 바이너리 누락. `.npmrc` 에 `supported-architectures=x64,arm64` / `supported-platforms=linux,darwin,win32` 추가 후 lock 재생성. (현재는 전 플랫폼 바이너리가 lock 에 포함되어 있어 불필요.)
