import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { media } from '@/styles/media';
import { GithubIcon } from '@/components/icon';
import { contact } from '@/content/profile';

const ContactSection = memo(() => {
  return (
    <section id="contact" css={wrapperStyle}>
      <h2 css={titleStyle}>{contact.title}</h2>
      <p css={descStyle}>{contact.desc}</p>
      <div css={actionsStyle}>
        <a css={[buttonStyle, primaryStyle]} href={`mailto:${contact.email}`}>
          ✉ {contact.email}
        </a>
        <a
          css={[buttonStyle, secondaryStyle]}
          href={contact.github}
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
          github.com/WoongDream
        </a>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';
export default ContactSection;

const wrapperStyle = (theme: Theme) => css`
  margin: 60px 0 40px;
  padding: 36px 22px;
  border-radius: ${theme.borderRadius['2xl']};
  background: ${theme.colors.bg.secondary};
  text-align: center;

  ${media.tabletUp} {
    margin-top: 84px;
    padding: 48px;
  }
`;

const titleStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: -0.02em;
  color: ${theme.colors.fg.primary};

  ${media.tabletUp} {
    font-size: ${theme.fontSize['2xl']};
  }
`;

const descStyle = (theme: Theme) => css`
  margin: 14px 0 28px;
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.fg.subtle};
`;

const actionsStyle = css`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

const buttonStyle = (theme: Theme) => css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 46px;
  padding: 0 24px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.semibold};
  text-decoration: none;
`;

const primaryStyle = (theme: Theme) => css`
  background: ${theme.colors.accent.primary};
  color: ${theme.colors.accent.fg};
`;

const secondaryStyle = (theme: Theme) => css`
  background: ${theme.colors.bg.primary};
  color: ${theme.colors.fg.primary};
  border: 1px solid ${theme.colors.border.primary};
`;
