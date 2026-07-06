import { memo } from 'react';
import { footerStyle, copyStyle } from './Footer.style';

const Footer = memo(() => {
  const year = new Date().getFullYear();
  return (
    <footer css={footerStyle}>
      <small css={copyStyle}>© {year} WoongDream. All rights reserved.</small>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
