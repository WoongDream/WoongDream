import { describe, it, expect } from 'vitest';
import { createSlugger, rehypeHeadingIds, slugify } from './heading';

type HastNode = Parameters<ReturnType<typeof rehypeHeadingIds>>[0];

const text = (value: string): HastNode => ({ type: 'text', value });
const el = (
  tagName: string,
  children: HastNode[],
  properties?: Record<string, unknown>,
): HastNode => ({
  type: 'element',
  tagName,
  properties,
  children,
});
const root = (children: HastNode[]): HastNode => ({ type: 'root', children });

describe('slugify', () => {
  it('keeps Korean text and joins words with hyphens', () => {
    expect(slugify('핵심 정리')).toBe('핵심-정리');
  });

  it('lowercases and trims', () => {
    expect(slugify('  Hello World  ')).toBe('hello-world');
  });

  it('strips punctuation and collapses the resulting whitespace', () => {
    expect(slugify('C++ & Rust!')).toBe('c-rust');
  });

  it('keeps existing hyphens and digits', () => {
    expect(slugify('step-1 시작')).toBe('step-1-시작');
  });

  it('returns an empty string when only punctuation is given', () => {
    expect(slugify('?!')).toBe('');
  });
});

describe('createSlugger', () => {
  it('appends -1, -2 to repeated headings', () => {
    const slug = createSlugger();
    expect([slug('개요'), slug('개요'), slug('개요')]).toEqual(['개요', '개요-1', '개요-2']);
  });

  it('falls back to "section" for empty text and dedupes it too', () => {
    const slug = createSlugger();
    expect([slug('!!!'), slug('')]).toEqual(['section', 'section-1']);
  });

  it('keeps counters independent per slugger instance', () => {
    const a = createSlugger();
    const b = createSlugger();
    a('x');
    expect(b('x')).toBe('x');
  });
});

describe('rehypeHeadingIds', () => {
  it('sets id on h2 and h3 but not on other elements', () => {
    const h1 = el('h1', [text('제목')]);
    const h2 = el('h2', [text('핵심 정리')]);
    const h3 = el('h3', [text('Sub Part')]);
    const p = el('p', [text('본문')]);
    rehypeHeadingIds()(root([h1, h2, h3, p]));

    expect(h2.properties).toEqual({ id: '핵심-정리' });
    expect(h3.properties).toEqual({ id: 'sub-part' });
    expect(h1.properties).toBeUndefined();
    expect(p.properties).toBeUndefined();
  });

  it('concatenates nested text such as code and strong children', () => {
    const h2 = el('h2', [
      text('Use '),
      el('code', [text('useState')]),
      text(' '),
      el('strong', [text('Now')]),
    ]);
    rehypeHeadingIds()(root([h2]));
    expect(h2.properties?.id).toBe('use-usestate-now');
  });

  it('dedupes repeated headings, including nested ones, and keeps other properties', () => {
    const first = el('h2', [text('Intro')], { className: 'a' });
    const second = el('h3', [text('Intro')]);
    const nested = el('h2', [text('Intro')]);
    rehypeHeadingIds()(root([first, el('section', [second, nested])]));

    expect(first.properties).toEqual({ className: 'a', id: 'intro' });
    expect(second.properties?.id).toBe('intro-1');
    expect(nested.properties?.id).toBe('intro-2');
  });

  it('does not share counters between runs', () => {
    const a = el('h2', [text('Same')]);
    const b = el('h2', [text('Same')]);
    rehypeHeadingIds()(root([a]));
    rehypeHeadingIds()(root([b]));
    expect(b.properties?.id).toBe('same');
  });
});
