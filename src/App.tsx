import { ThemeProvider } from '@emotion/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { theme } from '@/styles/theme';
import { appShellStyle, pageContentStyle } from '@/styles/layout';
import HomePage from './pages/home';
import NotFoundPage from './pages/not-found';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div css={appShellStyle}>
          <Header />
          <main css={pageContentStyle}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
