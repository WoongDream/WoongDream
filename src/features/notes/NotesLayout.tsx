import { memo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { notePath, type NotePage, type NotesTree, type NoteTopic } from './notes';
import {
  asideHeadStyle,
  asideOpenStyle,
  asideStyle,
  asideTaglineStyle,
  backdropOpenStyle,
  backdropStyle,
  backLinkStyle,
  burgerBarStyle,
  burgerStyle,
  crumbLinkStyle,
  crumbSepStyle,
  crumbTitleStyle,
  docHeaderStyle,
  groupLabelStyle,
  initialStyle,
  mainColumnStyle,
  mainScrollStyle,
  navActiveStyle,
  navDotActiveStyle,
  navDotStyle,
  navStyle,
  pageLinkStyle,
  rootStyle,
  siteLinkStyle,
  siteNameStyle,
  topicBlockStyle,
  topicLinkStyle,
} from './NotesLayout.style';

type NotesLayoutProps = {
  tree: NotesTree;
  topic?: NoteTopic;
  page?: NotePage;
  drawerOpen: boolean;
  onToggleDrawer: () => void;
  onCloseDrawer: () => void;
  setMainRef: (el: HTMLElement | null) => void;
  children: ReactNode;
};

const NotesLayout = memo(
  ({
    tree,
    topic,
    page,
    drawerOpen,
    onToggleDrawer,
    onCloseDrawer,
    setMainRef,
    children,
  }: NotesLayoutProps) => {
    return (
      <div css={rootStyle}>
        <div
          css={[backdropStyle, drawerOpen && backdropOpenStyle]}
          onClick={onCloseDrawer}
          aria-hidden
        />

        <aside css={[asideStyle, drawerOpen && asideOpenStyle]}>
          <Link css={backLinkStyle} to="/">
            ← 홈으로
          </Link>
          <div css={asideHeadStyle}>
            <Link css={siteLinkStyle} to={notePath()} onClick={onCloseDrawer}>
              <span css={initialStyle} aria-hidden>
                N
              </span>
              <span css={siteNameStyle}>Notes</span>
            </Link>
            {tree.home.summary && <div css={asideTaglineStyle}>{tree.home.summary}</div>}
          </div>

          <nav css={navStyle} aria-label="노트 목차">
            {tree.topics.map((t) => {
              const isOpen = t.slug === topic?.slug;
              const isCurrent = isOpen && !page;
              return (
                <div key={t.slug} css={topicBlockStyle}>
                  <Link
                    css={[topicLinkStyle, isCurrent && navActiveStyle]}
                    to={notePath(t.slug)}
                    onClick={onCloseDrawer}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {t.title}
                  </Link>
                  {isOpen &&
                    t.groups.map((group) => (
                      <div key={group.label || '_'}>
                        {group.label && <div css={groupLabelStyle}>{group.label}</div>}
                        {group.pages.map((p) => {
                          const on = p === page;
                          return (
                            <Link
                              key={p.slug}
                              css={[pageLinkStyle, on && navActiveStyle]}
                              to={notePath(t.slug, p.slug)}
                              onClick={onCloseDrawer}
                              aria-current={on ? 'page' : undefined}
                            >
                              <span css={[navDotStyle, on && navDotActiveStyle]} aria-hidden />
                              <span>{p.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                </div>
              );
            })}
          </nav>
        </aside>

        <div css={mainColumnStyle}>
          <header css={docHeaderStyle}>
            <button css={burgerStyle} type="button" onClick={onToggleDrawer} aria-label="메뉴 열기">
              <span css={burgerBarStyle} />
            </button>
            <Link css={crumbLinkStyle} to={notePath()}>
              Notes
            </Link>
            {topic && (
              <>
                <span css={crumbSepStyle}>/</span>
                {page ? (
                  <Link css={crumbLinkStyle} to={notePath(topic.slug)}>
                    {topic.title}
                  </Link>
                ) : (
                  <span css={crumbTitleStyle}>{topic.title}</span>
                )}
              </>
            )}
            {page && (
              <>
                <span css={crumbSepStyle}>/</span>
                <span css={crumbTitleStyle}>{page.title}</span>
              </>
            )}
          </header>

          <main css={mainScrollStyle} ref={setMainRef}>
            {children}
          </main>
        </div>
      </div>
    );
  },
);

NotesLayout.displayName = 'NotesLayout';
export default NotesLayout;
