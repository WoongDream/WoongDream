import { memo } from 'react';
import { headerStyle, logoStyle, navStyle, navLinkStyle } from './Header.style';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;

const Header = memo(() => {
  return (
    <header css={headerStyle}>
      <a css={logoStyle} href="#top">
        WoongDream
      </a>
      <nav css={navStyle}>
        {NAV_ITEMS.map((item) => (
          <a key={item.href} css={navLinkStyle} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
