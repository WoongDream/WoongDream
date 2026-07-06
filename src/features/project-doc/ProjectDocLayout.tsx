import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { media } from '@/styles/media';
import type { ProjectMeta } from '@/features/projects/projects';
import ProjectOverview from './ProjectOverview';
import DocView from './DocView';

type ProjectDocLayoutProps = {
  project: ProjectMeta;
  active: string; // 'overview' | doc.key
  drawerOpen: boolean;
  onSelect: (key: string) => void;
  onToggleDrawer: () => void;
  onCloseDrawer: () => void;
  setMainRef: (el: HTMLElement | null) => void;
};

const OVERVIEW_KEY = 'overview';

const ProjectDocLayout = memo(
  ({
    project,
    active,
    drawerOpen,
    onSelect,
    onToggleDrawer,
    onCloseDrawer,
    setMainRef,
  }: ProjectDocLayoutProps) => {
    const isOverview = active === OVERVIEW_KEY;
    const activeDoc = project.docs.find((d) => d.key === active);
    const crumbGroup = isOverview ? project.name : (activeDoc?.group ?? '');
    const crumbTitle = isOverview ? '프로젝트 개요' : (activeDoc?.title ?? '');

    const navGroups = project.navGroupOrder.map((group) => ({
      label: group,
      items:
        group === '개요'
          ? [
              {
                key: OVERVIEW_KEY,
                label: '프로젝트 개요',
                side: undefined as 'FE' | 'BE' | undefined,
              },
            ]
          : project.docs
              .filter((d) => d.group === group)
              .map((d) => ({ key: d.key, label: d.label, side: d.side })),
    }));

    return (
      <div css={rootStyle}>
        <div
          css={[backdropStyle, drawerOpen && backdropOpenStyle]}
          onClick={onCloseDrawer}
          aria-hidden
        />

        <aside css={[asideStyle, drawerOpen && asideOpenStyle]}>
          <Link css={backLinkStyle} to="/">
            ← 돌아가기
          </Link>
          <div css={asideHeadStyle}>
            <div css={asideTitleRowStyle}>
              <span css={initialStyle} aria-hidden>
                {project.initial}
              </span>
              <span css={asideNameStyle}>{project.name}</span>
            </div>
            <div css={asideTaglineStyle}>{project.tagline}</div>
          </div>

          <nav css={navStyle}>
            {navGroups.map((grp) => (
              <div key={grp.label} css={navGroupStyle}>
                <div css={navGroupLabelStyle}>{grp.label}</div>
                {grp.items.map((item) => {
                  const on = item.key === active;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      css={[navItemStyle, on && navItemActiveStyle]}
                      onClick={() => onSelect(item.key)}
                    >
                      <span css={[navDotStyle, on && navDotActiveStyle]} aria-hidden />
                      <span css={navItemLabelStyle}>{item.label}</span>
                      {item.side && <span css={navTagStyle(item.side)}>{item.side}</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          <div css={repoLinksStyle}>
            {project.repoLinks.map((link) => (
              <a
                key={link.url}
                css={repoLinkStyle}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </aside>

        <div css={mainColumnStyle}>
          <header css={docHeaderStyle}>
            <button css={burgerStyle} type="button" onClick={onToggleDrawer} aria-label="메뉴 열기">
              <span css={burgerBarStyle} />
            </button>
            <span css={crumbGroupStyle}>{crumbGroup}</span>
            <span css={crumbSepStyle}>/</span>
            <span css={crumbTitleStyle}>{crumbTitle}</span>
          </header>

          <main css={mainScrollStyle} ref={setMainRef}>
            {isOverview ? (
              <ProjectOverview project={project} onSelectDoc={onSelect} />
            ) : activeDoc ? (
              <DocView doc={activeDoc} />
            ) : null}
          </main>
        </div>
      </div>
    );
  },
);

ProjectDocLayout.displayName = 'ProjectDocLayout';
export default ProjectDocLayout;

const navTagStyle = (side: 'FE' | 'BE') => (theme: Theme) => css`
  font-size: 0.6rem;
  font-weight: ${theme.fontWeight.extrabold};
  letter-spacing: 0.03em;
  padding: 1px 5px;
  border-radius: ${theme.borderRadius.sm};
  color: ${side === 'FE' ? theme.colors.badge.feFg : theme.colors.badge.beFg};
  background: ${side === 'FE' ? theme.colors.badge.feBg : theme.colors.badge.beBg};
`;

const rootStyle = (theme: Theme) => css`
  display: flex;
  height: 100vh;
  width: 100%;
  background: ${theme.colors.bg.secondary};
  color: ${theme.colors.fg.primary};
`;

const backdropStyle = css`
  display: none;

  @media (max-width: 700px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.42);
    z-index: 50;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.26s ease;
  }
`;

const backdropOpenStyle = css`
  @media (max-width: 700px) {
    opacity: 1;
    pointer-events: auto;
  }
`;

const asideStyle = (theme: Theme) => css`
  width: 270px;
  flex-shrink: 0;
  height: 100%;
  background: ${theme.colors.bg.primary};
  border-right: 1px solid ${theme.colors.border.primary};
  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 84%;
    max-width: 310px;
    z-index: 60;
    transform: translateX(-100%);
    transition: transform 0.26s ease;
    box-shadow: 0 0 44px rgba(15, 23, 42, 0.22);
  }
`;

const asideOpenStyle = css`
  @media (max-width: 700px) {
    transform: translateX(0);
  }
`;

const backLinkStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px 0;
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.fg.secondary};
  text-decoration: none;

  &:hover {
    color: ${theme.colors.accent.active};
  }
`;

const asideHeadStyle = (theme: Theme) => css`
  padding: 14px 20px 18px;
  border-bottom: 1px solid ${theme.colors.border.secondary};
`;

const asideTitleRowStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const initialStyle = (theme: Theme) => css`
  width: 30px;
  height: 30px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.accent.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.accent.fg};
  font-weight: ${theme.fontWeight.extrabold};
  font-size: ${theme.fontSize.sm};
  box-shadow: 0 2px 6px rgba(56, 189, 248, 0.35);
`;

const asideNameStyle = (theme: Theme) => css`
  font-weight: ${theme.fontWeight.extrabold};
  font-size: ${theme.fontSize.md};
  letter-spacing: -0.01em;
`;

const asideTaglineStyle = (theme: Theme) => css`
  margin-top: 8px;
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.fg.tertiary};
  line-height: 1.5;
`;

const navStyle = css`
  flex: 1;
  overflow-y: auto;
  padding: 18px 12px 24px;
`;

const navGroupStyle = css`
  margin-bottom: 20px;
`;

const navGroupLabelStyle = (theme: Theme) => css`
  font-size: 0.7rem;
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: ${theme.colors.fg.tertiary};
  padding: 0 12px;
  margin-bottom: 8px;
`;

const navItemStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 12px;
  margin: 1px 0;
  border-radius: ${theme.borderRadius.md};
  border: none;
  cursor: pointer;
  background: transparent;
  font-family: inherit;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.fg.subtle};
  transition:
    background 0.12s,
    color 0.12s;

  &:hover {
    background: ${theme.colors.bg.secondary};
  }
`;

const navItemActiveStyle = (theme: Theme) => css`
  background: ${theme.colors.accent.subtle};
  color: #0c4a6e;
  font-weight: ${theme.fontWeight.bold};

  &:hover {
    background: ${theme.colors.accent.subtle};
  }
`;

const navDotStyle = (theme: Theme) => css`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${theme.colors.border.primary};
`;

const navDotActiveStyle = (theme: Theme) => css`
  background: ${theme.colors.accent.primary};
`;

const navItemLabelStyle = css`
  flex: 1;
  text-align: left;
`;

const repoLinksStyle = (theme: Theme) => css`
  padding: 14px 16px;
  border-top: 1px solid ${theme.colors.border.secondary};
  display: flex;
  gap: 8px;
`;

const repoLinkStyle = (theme: Theme) => css`
  flex: 1;
  text-align: center;
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.fg.subtle};
  text-decoration: none;
  padding: 8px 0;
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.md};

  &:hover {
    border-color: ${theme.colors.accent.primary};
    color: ${theme.colors.accent.active};
  }
`;

const mainColumnStyle = css`
  flex: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const docHeaderStyle = (theme: Theme) => css`
  height: 56px;
  flex-shrink: 0;
  border-bottom: 1px solid ${theme.colors.border.primary};
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;

  ${media.drawerUp} {
    padding: 0 26px;
  }
`;

const burgerStyle = (theme: Theme) => css`
  display: none;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  margin-right: 4px;
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.bg.primary};
  cursor: pointer;
  flex-shrink: 0;

  @media (max-width: 700px) {
    display: inline-flex;
  }
`;

const burgerBarStyle = css`
  position: relative;
  display: block;
  width: 16px;
  height: 2px;
  border-radius: 2px;
  background: #334155;
  box-shadow:
    0 -5px 0 #334155,
    0 5px 0 #334155;
`;

const crumbGroupStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.fg.tertiary};
  font-weight: ${theme.fontWeight.semibold};
`;

const crumbSepStyle = (theme: Theme) => css`
  color: ${theme.colors.border.primary};
`;

const crumbTitleStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.fg.primary};
  font-weight: ${theme.fontWeight.bold};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const mainScrollStyle = css`
  flex: 1;
  overflow-y: auto;
  position: relative;
  scroll-behavior: smooth;
`;
