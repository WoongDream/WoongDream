// 개인 프로젝트 메타데이터. About Me 카드 + 프로젝트 문서 사이트(개요/문서 목록)에서 공용으로 사용.
// 문서 본문은 각 repo README/docs 를 GitHub 에서 런타임 fetch 한다 (src/lib/github).

export type Tone = 'sky' | 'lime';

export type Tag = { label: string; tone: Tone };

export type TechCard = {
  name: string;
  note: string;
  sourceUrl?: string;
  tags: Tag[];
};

export type Feature = { emoji: string; title: string; desc: string };

export type ProjectDoc = {
  key: string;
  side?: 'FE' | 'BE';
  group: string;
  label: string;
  title: string;
  desc: string;
  repo: string; // WoongDream/<repo> 의 <repo>
  path: string; // repo 루트 기준 상대 경로 (README.md, docs/architecture.md ...)
};

export type RepoLink = { label: string; url: string };

export type ProjectCard = {
  emoji: string;
  tagline: string;
  status: string;
  summary: string;
  tags: string[];
};

export type ProjectMeta = {
  slug: string;
  name: string;
  initial: string;
  tagline: string;
  stackLine: string;
  heroDesc: string;
  liveUrl: string;
  repoLinks: RepoLink[];
  background: string;
  techCards: TechCard[];
  features: Feature[];
  outcomes: string[];
  footerNote: string;
  navGroupOrder: string[];
  docs: ProjectDoc[];
  card: ProjectCard;
};

export const projects: ProjectMeta[] = [
  {
    slug: 'ongodmatchu',
    name: 'OnGodMatchu',
    initial: 'O',
    tagline: '이미지·텍스트 기반 주관식 퀴즈 서비스',
    stackLine: 'React 19 · Spring Boot 3.5 · AWS',
    heroDesc:
      '이미지·텍스트 기반 주관식 퀴즈를 만들고 공유하는 서비스. 사용자가 직접 문제를 출제하고, 정답은 Claude API로 채점합니다.',
    liveUrl: 'https://ongodmatchu.com',
    repoLinks: [
      { label: 'FE Repo', url: 'https://github.com/WoongDream/OnGodMatchu-FE' },
      { label: 'BE Repo', url: 'https://github.com/WoongDream/OnGodMatchu-BE' },
    ],
    background:
      '"내 친구는 나를 얼마나 알까?" 라는 가벼운 호기심을 게임으로 풀고 싶었습니다. 내가 직접 낸 퀴즈를 친구들이 맞히고, 그 결과로 서로의 거리를 확인하는 경험을 만들고자 했습니다. 동시에 기획·디자인·풀스택 개발·운영을 혼자 끝까지 책임지는 사이클을 직접 경험해보는 것이 목표였습니다.',
    techCards: [
      {
        name: 'Frontend',
        note: 'SPA · S3 + CloudFront 정적 배포',
        sourceUrl: 'https://github.com/WoongDream/OnGodMatchu-FE',
        tags: [
          { label: 'React 19', tone: 'sky' },
          { label: 'TypeScript', tone: 'sky' },
          { label: 'Emotion', tone: 'sky' },
          { label: 'Zustand', tone: 'sky' },
          { label: 'SWR · Vite', tone: 'sky' },
        ],
      },
      {
        name: 'Backend',
        note: 'REST API · EC2 + Docker + Nginx',
        sourceUrl: 'https://github.com/WoongDream/OnGodMatchu-BE',
        tags: [
          { label: 'Java 17', tone: 'lime' },
          { label: 'Spring Boot', tone: 'lime' },
          { label: 'JPA · QueryDSL', tone: 'lime' },
          { label: 'PostgreSQL', tone: 'lime' },
          { label: 'Redis · S3', tone: 'lime' },
        ],
      },
    ],
    features: [
      {
        emoji: '📝',
        title: '퀴즈 출제 & 매칭',
        desc: '사용자가 직접 퀴즈를 만들고, 친구가 풀어 정답률로 서로의 친밀도를 확인합니다.',
      },
      {
        emoji: '🤖',
        title: 'AI 자동 채점 · 생성',
        desc: 'Claude API로 주관식 답을 유연하게 채점하고, 주제만 입력하면 퀴즈를 자동 생성합니다.',
      },
      {
        emoji: '🔐',
        title: '소셜 로그인 & 권한',
        desc: 'Google·Naver OAuth2 로그인과 RBAC 권한 체계로 사용자/관리자를 분리했습니다.',
      },
      {
        emoji: '🛠️',
        title: '관리자 백오피스',
        desc: '유저·공지·문의·알림·닉네임 관리 등 운영에 필요한 기능을 직접 구축했습니다.',
      },
    ],
    outcomes: [
      '기획·디자인·풀스택·운영의 전체 사이클을 혼자 돌리며 제품을 끝까지 책임지는 경험을 했습니다.',
      'Claude를 디자인·코드 작성 파트너로 활용해 1인 개발 생산성을 크게 끌어올렸습니다.',
      'GitHub Actions로 FE/BE 독립 배포 파이프라인을 구성해 운영 부담을 자동화했습니다.',
      '회원탈퇴 시 PII 즉시 파기 등 개인정보 보호를 코드 레벨에서 설계하는 감각을 익혔습니다.',
    ],
    footerNote:
      '본 문서는 두 저장소의 README 및 docs(architecture · conventions · deployment · image-management)를 그대로 담았습니다. 실제 서비스 화면은 ongodmatchu.com 에서 확인할 수 있습니다.',
    navGroupOrder: ['개요', 'Frontend', 'Backend'],
    docs: [
      {
        key: 'fe-readme',
        side: 'FE',
        group: 'Frontend',
        label: 'README',
        title: 'README',
        desc: '서비스 개요 · 기술 스택 · 화면/폴더 구조',
        repo: 'OnGodMatchu-FE',
        path: 'README.md',
      },
      {
        key: 'fe-arch',
        side: 'FE',
        group: 'Frontend',
        label: 'Architecture',
        title: 'Architecture',
        desc: 'pages / features / components 계층',
        repo: 'OnGodMatchu-FE',
        path: 'docs/architecture.md',
      },
      {
        key: 'fe-conv',
        side: 'FE',
        group: 'Frontend',
        label: 'Conventions',
        title: 'Conventions',
        desc: '명명 · 시맨틱 HTML · Emotion · 커밋',
        repo: 'OnGodMatchu-FE',
        path: 'docs/conventions.md',
      },
      {
        key: 'fe-deploy',
        side: 'FE',
        group: 'Frontend',
        label: 'Deployment',
        title: 'Deployment',
        desc: 'S3 + CloudFront · CI/CD · 캐시 전략',
        repo: 'OnGodMatchu-FE',
        path: 'docs/deployment.md',
      },
      {
        key: 'fe-image',
        side: 'FE',
        group: 'Frontend',
        label: 'Image Management',
        title: 'Image Management',
        desc: 'presigned 업로드 · key 기반 저장',
        repo: 'OnGodMatchu-FE',
        path: 'docs/image-management.md',
      },
      {
        key: 'be-readme',
        side: 'BE',
        group: 'Backend',
        label: 'README',
        title: 'README',
        desc: '기술 스택 · API · 패키지 구조 · 환경변수',
        repo: 'OnGodMatchu-BE',
        path: 'README.md',
      },
      {
        key: 'be-conv',
        side: 'BE',
        group: 'Backend',
        label: 'Conventions',
        title: 'Conventions',
        desc: '패키지 · 레이어 책임 · 트랜잭션',
        repo: 'OnGodMatchu-BE',
        path: 'docs/conventions.md',
      },
      {
        key: 'be-deploy',
        side: 'BE',
        group: 'Backend',
        label: 'Deployment',
        title: 'Deployment',
        desc: 'EC2 + Docker + Nginx · SSM 운영',
        repo: 'OnGodMatchu-BE',
        path: 'docs/deployment.md',
      },
      {
        key: 'be-image',
        side: 'BE',
        group: 'Backend',
        label: 'Image Management',
        title: 'Image Management',
        desc: 'S3 signed URL · 3중 검증 · 라이프사이클',
        repo: 'OnGodMatchu-BE',
        path: 'docs/image-management.md',
      },
    ],
    card: {
      emoji: '🧩',
      tagline: '퀴즈 매칭 웹 서비스',
      status: '운영 중',
      summary:
        '친구의 진짜 모습을 맞히는 퀴즈 매칭 서비스. 기획·디자인·프론트·백엔드·인프라까지 1인 풀스택으로 만들고 운영합니다.',
      tags: ['React', 'Spring Boot', 'Claude API', 'AWS'],
    },
  },
  {
    slug: 'dreamsam',
    name: 'DreamSam',
    initial: 'D',
    tagline: '미술 교사용 맞춤 수업 도구 보드',
    stackLine: 'React 19 · TypeScript · 프론트 전용',
    heroDesc:
      '미술 교사를 위한 맞춤 수업 도구 보드. 화이트보드·타이머·스톱워치·숫자 뽑기 등 수업에 필요한 도구를 로그인 없이 한 화면에 모았습니다.',
    liveUrl: 'https://dreamsam.net',
    repoLinks: [{ label: 'GitHub Repo', url: 'https://github.com/WoongDream/DreamSam' }],
    background:
      '미술 교사가 수업 중 자주 쓰는 도구 — 화이트보드·타이머·스톱워치·숫자 뽑기·시간표 — 는 보통 여러 사이트와 앱에 흩어져 있습니다. 매번 찾아 여는 번거로움 없이, 로그인이나 서버 없이도 바로 쓸 수 있는 가벼운 수업용 보드를 만들고자 했습니다. 데이터는 인메모리로만 다뤄 설치·계정 없이 새로고침 한 번으로 초기화되는 단순함을 목표로 했습니다.',
    techCards: [
      {
        name: '기술 스택',
        note: '프론트 전용 · 백엔드 없음 · 데이터는 인메모리(휘발성)',
        sourceUrl: 'https://github.com/WoongDream/DreamSam',
        tags: [
          { label: 'React 19', tone: 'sky' },
          { label: 'TypeScript', tone: 'sky' },
          { label: 'Emotion (css prop)', tone: 'sky' },
          { label: 'Zustand', tone: 'sky' },
          { label: 'React Router v7', tone: 'sky' },
          { label: 'Vite', tone: 'sky' },
          { label: 'Storybook', tone: 'sky' },
          { label: 'Vitest', tone: 'sky' },
        ],
      },
    ],
    features: [
      {
        emoji: '🖊️',
        title: '화이트보드',
        desc: '수업 중 자유롭게 판서·그리기 할 수 있는 보드. 펜·지우기 등 기본 도구를 제공합니다.',
      },
      {
        emoji: '⏱️',
        title: '타이머',
        desc: '활동 시간을 정해두는 카운트다운 타이머. 종료 시 알림음으로 시간을 안내합니다.',
      },
      {
        emoji: '⏲️',
        title: '스톱워치',
        desc: '경과 시간을 재는 스톱워치. 작업 소요 시간 측정 등에 활용합니다.',
      },
      {
        emoji: '🎲',
        title: '숫자 뽑기',
        desc: '범위 안에서 랜덤으로 번호를 뽑는 도구. 발표자·모둠 추첨 등에 사용합니다.',
      },
      {
        emoji: '📅',
        title: '시간표',
        desc: '수업 일정을 한눈에 볼 수 있는 시간표. 보드 위에 함께 띄워둘 수 있습니다.',
      },
      {
        emoji: '🕐',
        title: '시계',
        desc: '현재 시각을 크게 표시하는 시계 위젯. 교실 어디서나 보이도록 배치합니다.',
      },
    ],
    outcomes: [
      '백엔드·유저 개념 없이 인메모리 상태(Zustand)만으로 동작하는 프론트 전용 아키텍처를 설계했습니다.',
      'Storybook과 Vitest로 컴포넌트 문서화·단위 테스트 체계를 갖췄습니다.',
      'OnGodMatchu-FE의 구조·컨벤션을 재사용해 프로젝트 간 일관된 코드 스타일을 유지했습니다.',
      'React 19 · Emotion css prop only · React.memo 등 팀 규칙을 코드 레벨에서 일관되게 지켰습니다.',
    ],
    footerNote:
      '본 문서는 DreamSam 저장소의 README 및 docs(architecture · conventions)를 그대로 담았습니다. 실제 서비스 화면은 dreamsam.net 에서 확인할 수 있습니다.',
    navGroupOrder: ['개요', '문서'],
    docs: [
      {
        key: 'ds-readme',
        group: '문서',
        label: 'README',
        title: 'README',
        desc: '프로젝트 개요 · 기술 스택 · 구조 · 명령어',
        repo: 'DreamSam',
        path: 'README.md',
      },
      {
        key: 'ds-arch',
        group: '문서',
        label: 'Architecture',
        title: 'Architecture',
        desc: 'pages / features / components 레이어',
        repo: 'DreamSam',
        path: 'docs/architecture.md',
      },
      {
        key: 'ds-conv',
        group: '문서',
        label: 'Conventions',
        title: 'Conventions',
        desc: '명명 · 시맨틱 HTML · Emotion · 커밋',
        repo: 'DreamSam',
        path: 'docs/conventions.md',
      },
    ],
    card: {
      emoji: '🎨',
      tagline: '미술 교사용 수업 도구 보드',
      status: '운영 중',
      summary:
        '화이트보드·타이머·스톱워치·숫자 뽑기 등 수업 도구를 한 화면에 모은 프론트 전용 웹앱. 로그인·서버 없이 바로 쓰는 가벼운 보드입니다.',
      tags: ['React 19', 'TypeScript', 'Zustand', 'Storybook'],
    },
  },
];

export const getProjectBySlug = (slug: string): ProjectMeta | undefined =>
  projects.find((p) => p.slug === slug);
