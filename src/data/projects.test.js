import { describe, it, expect } from 'vitest';
import { projects } from './projects';

describe('projects data', () => {
  it('should export an array of projects', () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('should have required fields for each project', () => {
    projects.forEach((project) => {
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('tech');
      expect(project).toHaveProperty('comingSoon');
    });
  });

  it('should have unique ids for each project', () => {
    const ids = projects.map((project) => project.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have tech as an array for each project', () => {
    projects.forEach((project) => {
      expect(Array.isArray(project.tech)).toBe(true);
    });
  });

  it('should have non-empty title and description', () => {
    projects.forEach((project) => {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.description.length).toBeGreaterThan(0);
    });
  });

  it('should have comingSoon as boolean', () => {
    projects.forEach((project) => {
      expect(typeof project.comingSoon).toBe('boolean');
    });
  });

  it('coming soon projects should not have link or github', () => {
    const comingSoonProjects = projects.filter((p) => p.comingSoon);
    comingSoonProjects.forEach((project) => {
      expect(project.link).toBeFalsy();
      expect(project.github).toBeFalsy();
    });
  });

  it('non-coming-soon projects should have at least one link', () => {
    const activeProjects = projects.filter((p) => !p.comingSoon);
    activeProjects.forEach((project) => {
      const hasLink = project.link || project.github;
      expect(hasLink).toBeTruthy();
    });
  });
});
