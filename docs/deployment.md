# Deployment Guide

> ⚠️ **아직 미구성.** 아래는 OnGodMatchu-FE 와 동일하게 맞출 목표 패턴 메모다.
> 실제 `.github/workflows/deploy.yml` · 버킷 · 도메인 · GitHub Secrets 는 추후 단계에서 구성한다.

## 목표 인프라 (예정)

```
[GitHub] ──push(main)──> [GitHub Actions] ──build──> [S3]
                               │                       │
                               │ invalidate            │ origin
                               ▼                       ▼
                         [CloudFront] ◄────────────────
                               │ HTTPS
                               ▼
                         [Cloudflare DNS] ──> [User]
```

| 영역 | 구성(예정) |
|------|-----------|
| Static Hosting | AWS S3 (`<bucket-name>`) |
| CDN | AWS CloudFront |
| TLS | AWS ACM (us-east-1) |
| DNS | Cloudflare (DNS only) |
| Build | Vite (TypeScript + React) |
| CI/CD | GitHub Actions (`main` push 트리거) |

## CI/CD 흐름 (예정)

```
git push origin main
        ▼
GitHub Actions
  ├─ npm ci
  ├─ Vite production build (→ dist/)
  ├─ S3 sync (정적 자원 1년 immutable 캐시 / index.html no-cache / *.map 제외)
  └─ CloudFront 캐시 무효화 (/*)
```

## SPA 라우팅 (예정)

CloudFront 에러 응답: `403 → /index.html (200)`, `404 → /index.html (200)`
→ S3 에 없는 경로도 `index.html` 반환 → React Router 가 처리.

## GitHub Secrets (예정)

| 변수 | 설명 |
|------|------|
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | 배포용 IAM 키 |
| `S3_BUCKET_NAME` | 대상 버킷명 |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront 배포 ID |

## 수동 배포 (구성 후)

```bash
npm run build
aws s3 sync dist/ s3://<bucket-name> --delete
aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*"
```
