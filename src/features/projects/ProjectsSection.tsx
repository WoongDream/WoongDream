import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { text } from '@/styles/text';
import { sectionStyle, sectionTitleStyle } from '@/styles/layout';

type Project = {
  id: string;
  title: string;
  description: string;
  href?: string;
};

// TODO: 실제 프로젝트로 교체
const PROJECTS: Project[] = [
  { id: 'placeholder-1', title: '프로젝트 제목', description: '프로젝트 한 줄 설명이 들어갑니다.' },
];

const ProjectsSection = memo(() => {
  return (
    <section id="projects" css={sectionStyle}>
      <h2 css={sectionTitleStyle}>Projects</h2>
      <ul css={listStyle}>
        {PROJECTS.map((project) => (
          <li key={project.id} css={cardStyle}>
            <h3 css={cardTitleStyle}>{project.title}</h3>
            <p css={cardDescStyle}>{project.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';
export default ProjectsSection;

const listStyle = (theme: Theme) => css`
  display: grid;
  gap: ${theme.spacing.md};
  grid-template-columns: 1fr;

  @media (min-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const cardStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.lg};
  background-color: ${theme.colors.bg.primary};
`;

const cardTitleStyle = (theme: Theme) => css`
  ${text({ size: 'lg', weight: 'semibold' })({ theme })}
  color: ${theme.colors.fg.primary};
`;

const cardDescStyle = (theme: Theme) => css`
  ${text({ size: 'sm', weight: 'regular' })({ theme })}
  color: ${theme.colors.fg.secondary};
`;
