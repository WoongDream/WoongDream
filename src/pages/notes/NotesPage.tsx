import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import NotesLayout, {
  findPage,
  findTopic,
  NoteArticle,
  NotesHome,
  notesTree,
} from '@/features/notes';
import NotFoundPage from '@/pages/not-found';

// /notes · /notes/:topicSlug · /notes/:topicSlug/:pageSlug
const NotesPage = memo(() => {
  const { topicSlug, pageSlug } = useParams();
  const { pathname, hash } = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  const topic = topicSlug ? findTopic(notesTree, topicSlug) : undefined;
  const page = topic && pageSlug ? findPage(topic, pageSlug) : undefined;
  const notFound = (topicSlug != null && !topic) || (pageSlug != null && !page);

  // 경로가 바뀌면 맨 위로, #앵커가 있으면 그 제목으로 스크롤
  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      target.scrollIntoView?.();
    } else if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [pathname, hash]);

  useEffect(() => {
    const previous = document.title;
    document.title = [page?.title, topic?.title, 'Notes', 'WoongDream'].filter(Boolean).join(' · ');
    return () => {
      document.title = previous;
    };
  }, [topic, page]);

  const handleToggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);
  const handleCloseDrawer = useCallback(() => setDrawerOpen(false), []);
  const setMainRef = useCallback((el: HTMLElement | null) => {
    mainRef.current = el;
  }, []);

  if (notFound) {
    return <NotFoundPage />;
  }

  return (
    <NotesLayout
      tree={notesTree}
      topic={topic}
      page={page}
      drawerOpen={drawerOpen}
      onToggleDrawer={handleToggleDrawer}
      onCloseDrawer={handleCloseDrawer}
      setMainRef={setMainRef}
    >
      {topic ? (
        <NoteArticle key={pathname} topic={topic} page={page} />
      ) : (
        <NotesHome tree={notesTree} />
      )}
    </NotesLayout>
  );
});

NotesPage.displayName = 'NotesPage';
export default NotesPage;
