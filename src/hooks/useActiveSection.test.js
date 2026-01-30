import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useActiveSection, scrollToSection } from './useActiveSection';

describe('useActiveSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock window properties
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('should return empty string initially when no sections exist', () => {
    const { result } = renderHook(() => useActiveSection(['home', 'about']));
    expect(result.current).toBe('');
  });

  it('should detect active section based on scroll position', () => {
    // Create mock sections
    const homeSection = document.createElement('div');
    homeSection.id = 'home';
    Object.defineProperty(homeSection, 'offsetTop', { value: 0 });
    Object.defineProperty(homeSection, 'offsetHeight', { value: 500 });
    document.body.appendChild(homeSection);

    const aboutSection = document.createElement('div');
    aboutSection.id = 'about';
    Object.defineProperty(aboutSection, 'offsetTop', { value: 500 });
    Object.defineProperty(aboutSection, 'offsetHeight', { value: 500 });
    document.body.appendChild(aboutSection);

    const { result } = renderHook(() => useActiveSection(['home', 'about']));

    // Initial state should detect home section
    expect(result.current).toBe('home');
  });

  it('should update active section on scroll', () => {
    // Create mock sections
    const homeSection = document.createElement('div');
    homeSection.id = 'home';
    Object.defineProperty(homeSection, 'offsetTop', { value: 0 });
    Object.defineProperty(homeSection, 'offsetHeight', { value: 500 });
    document.body.appendChild(homeSection);

    const aboutSection = document.createElement('div');
    aboutSection.id = 'about';
    Object.defineProperty(aboutSection, 'offsetTop', { value: 500 });
    Object.defineProperty(aboutSection, 'offsetHeight', { value: 500 });
    document.body.appendChild(aboutSection);

    const { result } = renderHook(() => useActiveSection(['home', 'about']));

    // Scroll to about section
    act(() => {
      window.scrollY = 400;
      window.dispatchEvent(new Event('scroll'));
      vi.advanceTimersByTime(50);
    });

    expect(result.current).toBe('about');
  });

  it('should debounce scroll events', () => {
    const homeSection = document.createElement('div');
    homeSection.id = 'home';
    Object.defineProperty(homeSection, 'offsetTop', { value: 0 });
    Object.defineProperty(homeSection, 'offsetHeight', { value: 500 });
    document.body.appendChild(homeSection);

    const updateSpy = vi.fn();
    const originalGetElementById = document.getElementById.bind(document);
    document.getElementById = vi.fn((id) => {
      updateSpy();
      return originalGetElementById(id);
    });

    renderHook(() => useActiveSection(['home']));

    // Clear initial calls
    updateSpy.mockClear();

    // Fire multiple scroll events
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('scroll'));
    });

    // Should not have called yet (debounced)
    expect(updateSpy).not.toHaveBeenCalled();

    // Advance timers past debounce threshold
    act(() => {
      vi.advanceTimersByTime(50);
    });

    // Should have been called once after debounce
    expect(updateSpy).toHaveBeenCalledTimes(1);

    document.getElementById = originalGetElementById;
  });

  it('should cleanup on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useActiveSection(['home']));
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});

describe('scrollToSection', () => {
  it('should call scrollIntoView on the target element', () => {
    const section = document.createElement('div');
    section.id = 'test-section';
    document.body.appendChild(section);

    scrollToSection('test-section');

    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(section);
  });

  it('should not throw when element does not exist', () => {
    expect(() => scrollToSection('nonexistent')).not.toThrow();
  });
});
