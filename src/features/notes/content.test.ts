import { describe, it, expect } from 'vitest';
import { noteFiles, notesTree } from './content';
import { validateNotes } from './notes';

describe('실제 노트 콘텐츠', () => {
  it('콘텐츠 규칙을 모두 지킨다 (위반 목록이 비어 있다)', () => {
    expect(validateNotes(noteFiles)).toEqual([]);
  });

  it('홈 index.md 를 포함한다', () => {
    expect(Object.keys(noteFiles)).toContain('/src/content/notes/index.md');
  });

  it('모든 주제에 title 과 summary 가 있다', () => {
    for (const topic of notesTree.topics) {
      expect(topic.title.trim(), `${topic.slug} title`).not.toBe('');
      expect(topic.summary.trim(), `${topic.slug} summary`).not.toBe('');
    }
  });
});
