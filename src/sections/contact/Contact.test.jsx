import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';

// Mock emailjs
vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(() => Promise.resolve()),
  },
}));

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock useInView hook
vi.mock('../../hooks/useInView', () => ({
  useInView: () => [{ current: null }, true],
}));

describe('Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the contact form', () => {
      render(<Contact />);

      expect(screen.getByText('Contact Me')).toBeInTheDocument();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
    });

    it('should have correct placeholders', () => {
      render(<Contact />);

      expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Your message...')).toBeInTheDocument();
    });
  });

  describe('validation', () => {
    it('should show error when name is empty on blur', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const nameInput = screen.getByLabelText('Name');
      await user.click(nameInput);
      await user.tab();

      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    it('should show error when name is too short', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const nameInput = screen.getByLabelText('Name');
      await user.type(nameInput, 'A');
      await user.tab();

      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
    });

    it('should show error when email is empty on blur', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const emailInput = screen.getByLabelText('Email');
      await user.click(emailInput);
      await user.tab();

      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    it('should show error for invalid email format', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const emailInput = screen.getByLabelText('Email');
      await user.type(emailInput, 'invalid-email');
      await user.tab();

      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });

    it('should show error when message is empty on blur', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const messageInput = screen.getByLabelText('Message');
      await user.click(messageInput);
      await user.tab();

      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });

    it('should show error when message is too short', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const messageInput = screen.getByLabelText('Message');
      await user.type(messageInput, 'Short');
      await user.tab();

      expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
    });

    it('should clear error when valid input is provided', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const nameInput = screen.getByLabelText('Name');
      await user.click(nameInput);
      await user.tab();

      expect(screen.getByText('Name is required')).toBeInTheDocument();

      await user.type(nameInput, 'John Doe');

      await waitFor(() => {
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
      });
    });
  });

  describe('form submission', () => {
    it('should show validation errors when submitting empty form', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const submitButton = screen.getByRole('button', { name: 'Send Message' });
      await user.click(submitButton);

      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });

    it('should submit form with valid data', async () => {
      const emailjs = await import('@emailjs/browser');
      const user = userEvent.setup();

      render(<Contact />);

      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'john@example.com');
      await user.type(screen.getByLabelText('Message'), 'This is a test message that is long enough.');

      const submitButton = screen.getByRole('button', { name: 'Send Message' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(emailjs.default.send).toHaveBeenCalled();
      });
    });

    it('should show loading state during submission', async () => {
      const emailjs = await import('@emailjs/browser');
      // Make the send function take some time
      emailjs.default.send.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

      const user = userEvent.setup();
      render(<Contact />);

      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'john@example.com');
      await user.type(screen.getByLabelText('Message'), 'This is a test message that is long enough.');

      const submitButton = screen.getByRole('button', { name: 'Send Message' });
      await user.click(submitButton);

      expect(screen.getByRole('button', { name: 'Sending...' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled();
    });

    it('should clear form after successful submission', async () => {
      const emailjs = await import('@emailjs/browser');
      emailjs.default.send.mockResolvedValue({});

      const user = userEvent.setup();
      render(<Contact />);

      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const messageInput = screen.getByLabelText('Message');

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'This is a test message that is long enough.');

      const submitButton = screen.getByRole('button', { name: 'Send Message' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(nameInput).toHaveValue('');
        expect(emailInput).toHaveValue('');
        expect(messageInput).toHaveValue('');
      });
    });
  });

  describe('accessibility', () => {
    it('should have aria-invalid on fields with errors', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const nameInput = screen.getByLabelText('Name');
      await user.click(nameInput);
      await user.tab();

      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('should have aria-describedby linking to error message', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const nameInput = screen.getByLabelText('Name');
      await user.click(nameInput);
      await user.tab();

      expect(nameInput).toHaveAttribute('aria-describedby', 'name-error');
      expect(screen.getByText('Name is required')).toHaveAttribute('id', 'name-error');
    });
  });
});
