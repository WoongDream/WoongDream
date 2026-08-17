// About Me 메인 화면에 쓰이는 정적 프로필 데이터.
// claude design `About Me.dc.html` 의 renderVals() 콘텐츠를 우리 타입으로 옮긴 것.

export type NavItem = { label: string; href: string };

export type Stat = { value: string; unit: string; label: string };

export type Highlight = { emoji: string; tint: string; title: string; desc: string };

export type Career = {
  period: string;
  client: string;
  name: string;
  role: string;
  desc: string;
  tech: string[];
};

export type SkillGroup = { group: string; items: string[] };

export type Cert = { name: string; date: string };

export type Award = { text: string; href?: string; label?: string };

export const hero = {
  badge: '삼성SDS · FE 중심 풀스택 개발자',
  titleLines: ['깊게 파고들고,', '끝까지 만들어내는', '개발자 박기웅입니다.'],
  highlightName: '박기웅',
  lead: [
    '연세대 수학과를 졸업하고 삼성SDS에서 6년째 제품을 만들고 있습니다.',
    '프론트엔드를 깊게 다루면서도 백엔드·인프라·신기술까지 직접 손으로 구현하며,',
    '끝까지 책임지는 것을 좋아합니다.',
  ],
} as const;

export const navItems: NavItem[] = [
  { label: '소개', href: '#about' },
  { label: '경력', href: '#career' },
  { label: '개인 프로젝트', href: '#project' },
  { label: '역량', href: '#skills' },
  { label: '자격·수상', href: '#awards' },
];

export const stats: Stat[] = [
  { value: '6', unit: '년차', label: '삼성SDS 재직' },
  { value: '9', unit: '개+', label: '수행 프로젝트' },
  { value: '2', unit: '개', label: '운영 중 개인 서비스' },
  { value: '5', unit: '개+', label: '경험한 기술 도메인' },
];

export const aboutLead =
  '일을 잘하고 인정받는 것에 그치지 않고,\n새로운 기술을 끝까지 탐구해 직접 만들어냅니다.';

export const highlights: Highlight[] = [
  {
    emoji: '🏆',
    tint: '#fef3c7',
    title: '인정받는 개발자',
    desc: '삼성커리어스 SW직무 인터뷰에 회사 대표로 참여했고, 2년 연속 상위 고과와 우수 그룹원 시상을 받았습니다.',
  },
  {
    emoji: '⚡',
    tint: '#e0f5ff',
    title: '프론트엔드 전문성',
    desc: '케이뱅크 앱 공통팀에서 Anchor 역할을 맡아, 공통 컴포넌트 개발과 공통 인터랙션, a11y(접근성) 인증까지 직접 책임졌습니다.',
  },
  {
    emoji: '🚀',
    tint: '#dcfce7',
    title: '끝까지 만드는 실행력',
    desc: '여러 개인 프로젝트를 1인 풀스택으로 개발·운영 중입니다. Claude로 디자인·코드를 작성하고, AWS(S3·CloudFront·EC2)에 GitHub Actions로 자동 배포합니다.',
  },
  {
    emoji: '🥽',
    tint: '#f3e8ff',
    title: '신기술에 대한 열망',
    desc: 'Metamong 프로젝트에서 Vision Pro, Meta Quest 3 등 XR 신기술을 미친 듯이 탐구하며 3D 협업 도구를 만들었습니다.',
  },
];

export const careers: Career[] = [
  {
    period: '26.06 — 현재',
    client: 'MSP공통실행그룹',
    name: 'MG새마을금고 차세대 제안',
    role: '제안',
    desc: 'MG새마을금고 계정계 차세대 프로젝트 제안 업무를 수행하고 있습니다.',
    tech: ['제안', '아키텍처'],
  },
  {
    period: '26.05',
    client: '교육',
    name: 'AX 양성 과정',
    role: '수료',
    desc: 'AWS Bedrock 기반 RAG 파이프라인 및 AI Agent 설계·구현 역량을 이론과 실습으로 습득했습니다.',
    tech: ['AWS Bedrock', 'RAG', 'AI Agent'],
  },
  {
    period: '25.04 — 26.03',
    client: '케이뱅크',
    name: 'Kbank App · 인앱 웹뷰',
    role: 'Frontend',
    desc: '케이뱅크 네이티브 앱(Android·iOS) 내 인앱 웹뷰를 개발하며 공통·공통 컴포넌트를 담당하고 공통팀 Anchor 역할을 수행했습니다. a11y 인증 통과, 큰글씨·다크테마 대응까지 책임졌습니다.',
    tech: [
      'React 19',
      'TypeScript',
      'emotion',
      'zustand',
      'Radix UI',
      'module-federation',
      'turborepo',
      'vite',
    ],
  },
  {
    period: '25.02 — 25.04',
    client: '사내 프로젝트',
    name: '신입 역량 강화 교육',
    role: '교육 멘토',
    desc: '전사 신입사원 36명을 대상으로 Agile 문화 기반 개발 강의를 진행했습니다. Frontend·Backend·CI/CD 등 실무 전반을 다뤘습니다.',
    tech: ['Frontend', 'Backend', 'CI/CD', 'Agile'],
  },
  {
    period: '23.10 — 25.01',
    client: '사내 프로젝트',
    name: 'Metamong',
    role: 'Full Stack',
    desc: '3D 공간 기반 Communication & Collaboration Tool을 개발했습니다. Web·WindowOS·macOS·VR 헤드셋(Quest 3, Vision Pro)을 지원합니다.',
    tech: ['Unity (C#)', 'Photon', 'Spring Boot', 'MS PlayFab', 'AWS', 'React'],
  },
  {
    period: '23.03 — 23.09',
    client: '삼성웰스토리',
    name: 'Wellstory Mall',
    role: 'Full Stack',
    desc: '이커머스 플랫폼(Web·Android·iOS)을 개발했습니다. 프로모션 팀에서 이벤트·공지·쿠폰 기능을 담당했습니다.',
    tech: ['React 18', 'Spring Boot', 'Spring Data JPA', 'MySQL'],
  },
  {
    period: '22.09 — 23.01',
    client: '사내 프로젝트',
    name: 'ProjectView',
    role: 'Full Stack',
    desc: '프로젝트 공정관리 시스템(Web)을 개발했습니다.',
    tech: ['Vue', 'Spring Boot', 'AWS', 'SCP'],
  },
  {
    period: '22.05 — 22.09',
    client: '사내 프로젝트',
    name: 'Opensource Management System',
    role: 'Full Stack',
    desc: '사내 오픈소스 관리 시스템(Web)을 개발했습니다.',
    tech: ['Vue', 'Spring Boot', 'PostgreSQL', 'AWS'],
  },
  {
    period: '21.03 — 21.12',
    client: '인사팀 채용 TF',
    name: '신입 채용 업무 전반',
    role: '채용 담당자',
    desc: '신입사원 때 발탁되어 인사팀 채용 TF에서 신입 채용 전반과 인턴 관리를 담당하며 회사를 깊이 이해했습니다.',
    tech: ['채용', 'TF'],
  },
];

export const skills: SkillGroup[] = [
  {
    group: 'Frontend',
    items: [
      'React',
      'TypeScript',
      'Vite',
      'emotion',
      'zustand',
      'SWR',
      'Radix UI',
      'React-Aria',
      'module-federation',
      'turborepo',
      'a11y',
    ],
  },
  {
    group: 'Backend · Infra',
    items: [
      'Spring Boot',
      'Spring Data JPA',
      'Spring Security',
      'PostgreSQL',
      'MySQL',
      'AWS (EC2·S3·CloudFront)',
      'Docker / GHCR',
      'GitHub Actions',
      'Cloudflare',
    ],
  },
  {
    group: 'XR · AI · 기타',
    items: [
      'Unity (C#)',
      'Photon',
      'Vision Pro',
      'Meta Quest 3',
      'Claude API',
      'AWS Bedrock',
      'RAG',
      'Vue',
    ],
  },
];

export const certs: Cert[] = [
  { name: 'SAIL (Samsung AI Language) Test – IH', date: '26.06' },
  { name: 'AI Certificate Advanced', date: '26.04' },
  { name: 'AI Certificate Associate', date: '25.10' },
  { name: 'Samsung Cloud Platform Certified Cloud Business Leader', date: '23.04' },
  { name: 'AWS Certified Solutions Architect – Associate', date: '22.08' },
  { name: 'SW검정 PROFESSIONAL (삼성SDS)', date: '21.02' },
];

export const awards: Award[] = [
  { text: '상위 고과 (’24년 상반기 ~ 현재)' },
  { text: '전사 신입사원 36명 개발 교육 멘토 (Frontend·Backend·CI/CD, ’25 상반기)' },
  { text: '대학생 알고리즘 특강 주강사 (’23·’25, 각 30여 명)' },
  {
    text: '삼성커리어스 SW직무 인터뷰 — 회사 대표 (’24년 하반기)',
    href: 'https://www.samsungcareers.com/subsid/detail/C60',
    label: '인터뷰',
  },
  { text: '사내 게임 토너먼트(LOL) 3위 (’24년 여름)' },
  { text: '우수 그룹원 시상 (그룹 내 2인, ’23년 상반기)' },
  {
    text: '2020 ACM-ICPC Seoul Regional 본선 24위\n팀 AttitudeProbSolving',
    href: 'http://static.icpckorea.net/2020/scoreboard_terpin/',
    label: '스코어보드',
  },
  { text: '2020 UCPC 본선 49위' },
  {
    text: 'C++ 알고리즘 문제풀이 블로그 운영 (대학생 시절)',
    href: 'https://mapocodingpark.blogspot.com/',
    label: '블로그',
  },
];

export const contact = {
  title: '함께 좋은 제품을 만들어요',
  desc: '새로운 기회나 협업 제안은 언제든 환영합니다.',
  email: 'pkww1@naver.com',
  github: 'https://github.com/WoongDream',
} as const;
