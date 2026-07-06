import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { renderWithTheme, screen } from '@/test/renderWithTheme';
import { projects } from '@/features/projects/projects';
import ProjectsSection from './ProjectsSection';

const renderSection = () =>
  renderWithTheme(
    <MemoryRouter>
      <ProjectsSection />
    </MemoryRouter>,
  );

describe('ProjectsSection', () => {
  it('renders one link per project', () => {
    renderSection();
    expect(screen.getAllByRole('link')).toHaveLength(projects.length);
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('renders each project name', () => {
    renderSection();
    expect(screen.getByText('OnGodMatchu')).toBeInTheDocument();
    expect(screen.getByText('DreamSam')).toBeInTheDocument();
  });

  it('links each card to its project detail route', () => {
    renderSection();
    expect(screen.getByRole('link', { name: /OnGodMatchu/ })).toHaveAttribute(
      'href',
      '/projects/ongodmatchu',
    );
    expect(screen.getByRole('link', { name: /DreamSam/ })).toHaveAttribute(
      'href',
      '/projects/dreamsam',
    );
  });

  it('data-drives hrefs from the projects source', () => {
    renderSection();
    for (const project of projects) {
      expect(screen.getByRole('link', { name: new RegExp(project.name) })).toHaveAttribute(
        'href',
        `/projects/${project.slug}`,
      );
    }
  });

  it('renders card details for each project', () => {
    renderSection();
    for (const project of projects) {
      expect(screen.getByText(project.card.tagline)).toBeInTheDocument();
      expect(screen.getByText(project.card.summary)).toBeInTheDocument();
      for (const tag of project.card.tags) {
        expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
      }
    }
    expect(screen.getAllByText('자세히 보기 →')).toHaveLength(projects.length);
  });

  it('renders the project status for each card', () => {
    renderSection();
    for (const project of projects) {
      expect(screen.getAllByText(project.card.status).length).toBeGreaterThan(0);
    }
  });

  it('exposes the expected displayName', () => {
    expect(ProjectsSection.displayName).toBe('ProjectsSection');
  });
});
