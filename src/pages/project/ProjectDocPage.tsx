import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectDocLayout from '@/features/project-doc';
import { getProjectBySlug, type ProjectMeta } from '@/features/projects/projects';
import NotFoundPage from '@/pages/not-found';

const OVERVIEW_KEY = 'overview';

const storageKey = (slug: string) => `doc-active:${slug}`;

const readStored = (slug: string, project: ProjectMeta | undefined): string => {
  if (!project) {
    return OVERVIEW_KEY;
  }
  try {
    const saved = localStorage.getItem(storageKey(slug));
    if (saved && (saved === OVERVIEW_KEY || project.docs.some((d) => d.key === saved))) {
      return saved;
    }
  } catch {
    // localStorage 접근 불가(프라이빗 모드 등) — 기본값 사용
  }
  return OVERVIEW_KEY;
};

const ProjectDocPage = memo(() => {
  const { slug = '' } = useParams();
  const project = getProjectBySlug(slug);

  const [active, setActive] = useState<string>(() => readStored(slug, project));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  // 프로젝트(slug) 전환 시 상태 초기화
  useEffect(() => {
    setActive(readStored(slug, project));
    setDrawerOpen(false);
  }, [slug, project]);

  const handleSelect = useCallback(
    (key: string) => {
      setActive(key);
      setDrawerOpen(false);
      if (mainRef.current) {
        mainRef.current.scrollTop = 0;
      }
      try {
        localStorage.setItem(storageKey(slug), key);
      } catch {
        // 무시
      }
    },
    [slug],
  );

  const handleToggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);
  const handleCloseDrawer = useCallback(() => setDrawerOpen(false), []);
  const setMainRef = useCallback((el: HTMLElement | null) => {
    mainRef.current = el;
  }, []);

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <ProjectDocLayout
      project={project}
      active={active}
      drawerOpen={drawerOpen}
      onSelect={handleSelect}
      onToggleDrawer={handleToggleDrawer}
      onCloseDrawer={handleCloseDrawer}
      setMainRef={setMainRef}
    />
  );
});

ProjectDocPage.displayName = 'ProjectDocPage';
export default ProjectDocPage;
