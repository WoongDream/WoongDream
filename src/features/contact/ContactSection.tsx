import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { text } from '@/styles/text';
import { sectionStyle, sectionTitleStyle } from '@/styles/layout';

type ContactLink = {
  label: string;
  href: string;
};

// TODO: 실제 연락처로 교체
const CONTACT_LINKS: ContactLink[] = [
  { label: 'Email', href: 'mailto:parkpkww@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/WoongDream' },
];

const ContactSection = memo(() => {
  return (
    <section id="contact" css={sectionStyle}>
      <h2 css={sectionTitleStyle}>Contact</h2>
      <ul css={listStyle}>
        {CONTACT_LINKS.map((link) => (
          <li key={link.label}>
            <a css={linkStyle} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';
export default ContactSection;

const listStyle = (theme: Theme) => css`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const linkStyle = (theme: Theme) => css`
  ${text({ size: 'md', weight: 'medium' })({ theme })}
  color: ${theme.colors.accent.primary};
  transition: color 0.15s;

  &:hover {
    color: ${theme.colors.accent.hover};
  }
`;
