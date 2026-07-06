import { memo } from 'react';
import { navItems } from '@/content/profile';
import { headerStyle, logoStyle, navStyle, navLinkStyle } from './Header.style';

const Header = memo(() => {
  return (
    <header css={headerStyle}>
      <a css={logoStyle} href="#top">
        박기웅<span>.</span>
      </a>
      <nav css={navStyle}>
        {navItems.map((item) => (
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
