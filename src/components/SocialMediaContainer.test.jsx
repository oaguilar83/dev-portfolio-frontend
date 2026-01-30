import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SocialMedia from './SocialMediaContainer';

describe('SocialMediaContainer', () => {
  it('should render GitHub link', () => {
    render(<SocialMedia />);

    const githubLink = screen.getByLabelText('GitHub');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/oaguilar83');
  });

  it('should render LinkedIn link', () => {
    render(<SocialMedia />);

    const linkedInLink = screen.getByLabelText('LinkedIn');
    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/oaguilar83/');
  });

  it('should open links in new tab', () => {
    render(<SocialMedia />);

    const githubLink = screen.getByLabelText('GitHub');
    const linkedInLink = screen.getByLabelText('LinkedIn');

    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(linkedInLink).toHaveAttribute('target', '_blank');
  });

  it('should have security attributes for external links', () => {
    render(<SocialMedia />);

    const githubLink = screen.getByLabelText('GitHub');
    const linkedInLink = screen.getByLabelText('LinkedIn');

    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should have accessible labels', () => {
    render(<SocialMedia />);

    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  });
});
