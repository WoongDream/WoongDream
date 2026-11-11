import { lazy, Suspense } from 'react';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { theme } from '@/styles/theme';
import HomePage from './pages/home';
import ProjectDocPage from './pages/project';
import NotFoundPage from './pages/not-found';

// 노트 마크다운이 홈 번들에 섞이지 않도록 노트 라우트는 따로 불러온다
const NotesPage = lazy(() => import('./pages/notes'));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectDocPage />} />
          <Route
            path="/notes/:topicSlug?/:pageSlug?"
            element={
              <Suspense fallback={null}>
                <NotesPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
