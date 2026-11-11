// 빌드 시점에 src/content/notes 의 마크다운을 모두 번들에 넣는다. 노트 라우트는 lazy 로딩이라 홈 번들에는 들어가지 않는다.
import { buildNotes } from './notes';

export const noteFiles = import.meta.glob<string>('/src/content/notes/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const notesTree = buildNotes(noteFiles);
