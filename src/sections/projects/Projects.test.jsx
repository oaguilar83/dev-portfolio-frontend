import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Projects from './Projects';

// Mock useInView hook
vi.mock('../../hooks/useInView', () => ({
  useInView: () => [{ current: null }, true],
}));

// Mock the projects data
vi.mock('../../data/projects', () => ({
  projects: [
    {
      id: 1,
      title: 'Project One',
      description: 'First project description',
      tech: ['React', 'Node.js'],
      link: 'https://example.com/project1',
      github: 'https://github.com/user/project1',
      comingSoon: false,
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'Second project description',
      tech: ['Python', 'Django'],
      link: 'https://example.com/project2',
      github: 'https://github.com/user/project2',
      comingSoon: false,
    },
    {
      id: 3,
      title: 'Project Three',
      description: 'Coming soon project',
      tech: [],
      link: null,
      github: null,
      comingSoon: true,
    },
  ],
}));

describe('Projects', () => {
  describe('rendering', () => {
    it('should render the projects section', () => {
      render(<Projects />);

      expect(screen.getByText('Projects')).toBeInTheDocument();
    });

    it('should display the first project by default', () => {
      render(<Projects />);

      expect(screen.getByText('Project One')).toBeInTheDocument();
      expect(screen.getByText('First project description')).toBeInTheDocument();
    });

    it('should render tech stack tags', () => {
      render(<Projects />);

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
    });

    it('should render project links for non-coming-soon projects', () => {
      render(<Projects />);

      expect(screen.getByText('Live Demo')).toBeInTheDocument();
      expect(screen.getByText('GitHub')).toBeInTheDocument();
    });

    it('should render navigation buttons', () => {
      render(<Projects />);

      expect(screen.getByLabelText('Previous project')).toBeInTheDocument();
      expect(screen.getByLabelText('Next project')).toBeInTheDocument();
    });

    it('should render indicator buttons for each project', () => {
      render(<Projects />);

      expect(screen.getByLabelText('Go to project 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to project 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to project 3')).toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('should go to next project when clicking next button', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      const nextButton = screen.getByLabelText('Next project');
      await user.click(nextButton);

      expect(screen.getByText('Project Two')).toBeInTheDocument();
      expect(screen.getByText('Second project description')).toBeInTheDocument();
    });

    it('should go to previous project when clicking previous button', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      const prevButton = screen.getByLabelText('Previous project');
      await user.click(prevButton);

      // Should wrap to last project
      expect(screen.getByText('Project Three')).toBeInTheDocument();
    });

    it('should wrap to first project when clicking next on last project', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      const nextButton = screen.getByLabelText('Next project');
      await user.click(nextButton); // Go to project 2
      await user.click(nextButton); // Go to project 3
      await user.click(nextButton); // Wrap to project 1

      expect(screen.getByText('Project One')).toBeInTheDocument();
    });

    it('should navigate to specific project when clicking indicator', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      const indicator2 = screen.getByLabelText('Go to project 2');
      await user.click(indicator2);

      expect(screen.getByText('Project Two')).toBeInTheDocument();
    });
  });

  describe('coming soon projects', () => {
    it('should display coming soon badge', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      // Navigate to the coming soon project
      const indicator3 = screen.getByLabelText('Go to project 3');
      await user.click(indicator3);

      expect(screen.getByText('Coming Soon')).toBeInTheDocument();
    });

    it('should not display project links for coming soon projects', async () => {
      const user = userEvent.setup();
      render(<Projects />);

      // Navigate to the coming soon project
      const indicator3 = screen.getByLabelText('Go to project 3');
      await user.click(indicator3);

      expect(screen.queryByText('Live Demo')).not.toBeInTheDocument();
      expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
    });
  });

  describe('project links', () => {
    it('should have correct href for live demo link', () => {
      render(<Projects />);

      const liveDemo = screen.getByText('Live Demo');
      expect(liveDemo).toHaveAttribute('href', 'https://example.com/project1');
    });

    it('should have correct href for github link', () => {
      render(<Projects />);

      const github = screen.getByText('GitHub');
      expect(github).toHaveAttribute('href', 'https://github.com/user/project1');
    });

    it('should open links in new tab', () => {
      render(<Projects />);

      const liveDemo = screen.getByText('Live Demo');
      const github = screen.getByText('GitHub');

      expect(liveDemo).toHaveAttribute('target', '_blank');
      expect(github).toHaveAttribute('target', '_blank');
    });

    it('should have security attributes for external links', () => {
      render(<Projects />);

      const liveDemo = screen.getByText('Live Demo');
      const github = screen.getByText('GitHub');

      expect(liveDemo).toHaveAttribute('rel', 'noopener noreferrer');
      expect(github).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
