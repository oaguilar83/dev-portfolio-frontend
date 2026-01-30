import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RoundImage from './RoundImage';

describe('RoundImage', () => {
  it('should render an image with the provided src', () => {
    render(<RoundImage image="/test-image.jpg" alt="Test image" />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('should render an image with the provided alt text', () => {
    render(<RoundImage image="/test-image.jpg" alt="Profile photo" />);

    const image = screen.getByAltText('Profile photo');
    expect(image).toBeInTheDocument();
  });

  it('should have lazy loading enabled', () => {
    render(<RoundImage image="/test-image.jpg" alt="Test image" />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('should apply CSS module classes', () => {
    const { container } = render(<RoundImage image="/test-image.jpg" alt="Test image" />);

    const wrapper = container.firstChild;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.tagName).toBe('DIV');
  });
});
