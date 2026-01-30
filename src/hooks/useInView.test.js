import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useInView } from './useInView';

describe('useInView', () => {
  let observerCallback;
  let observerOptions;
  let mockObserve;
  let mockUnobserve;
  let mockDisconnect;

  beforeEach(() => {
    mockObserve = vi.fn();
    mockUnobserve = vi.fn();
    mockDisconnect = vi.fn();

    // Use a class to properly mock IntersectionObserver
    class MockIntersectionObserver {
      constructor(callback, options) {
        observerCallback = callback;
        observerOptions = options;
      }

      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = mockDisconnect;
    }

    global.IntersectionObserver = MockIntersectionObserver;
  });

  it('should return a ref and initial isInView as false', () => {
    const { result } = renderHook(() => useInView());

    const [ref, isInView] = result.current;

    expect(ref).toBeDefined();
    expect(ref.current).toBeNull();
    expect(isInView).toBe(false);
  });

  it('should set isInView to true when element intersects', () => {
    const element = document.createElement('div');

    const { result } = renderHook(() => {
      const hookResult = useInView();
      hookResult[0].current = element;
      return hookResult;
    });

    // The observer should have been created and is observing
    expect(mockObserve).toHaveBeenCalledWith(element);

    // Trigger intersection
    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    expect(result.current[1]).toBe(true);
  });

  it('should not set isInView when element is not intersecting', () => {
    const element = document.createElement('div');

    const { result } = renderHook(() => {
      const hookResult = useInView();
      hookResult[0].current = element;
      return hookResult;
    });

    act(() => {
      observerCallback([{ isIntersecting: false }]);
    });

    expect(result.current[1]).toBe(false);
  });

  it('should unobserve element after first intersection', () => {
    const element = document.createElement('div');

    renderHook(() => {
      const hookResult = useInView();
      hookResult[0].current = element;
      return hookResult;
    });

    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    expect(mockUnobserve).toHaveBeenCalledWith(element);
  });

  it('should use default options when none provided', () => {
    const element = document.createElement('div');

    renderHook(() => {
      const hookResult = useInView();
      hookResult[0].current = element;
      return hookResult;
    });

    expect(observerOptions.threshold).toBe(0.1);
    expect(observerOptions.rootMargin).toBe('0px');
  });

  it('should use custom options when provided', () => {
    const element = document.createElement('div');
    const options = { threshold: 0.5, rootMargin: '10px' };

    renderHook(() => {
      const hookResult = useInView(options);
      hookResult[0].current = element;
      return hookResult;
    });

    expect(observerOptions.threshold).toBe(0.5);
    expect(observerOptions.rootMargin).toBe('10px');
  });

  it('should disconnect observer on unmount', () => {
    const element = document.createElement('div');

    const { unmount } = renderHook(() => {
      const hookResult = useInView();
      hookResult[0].current = element;
      return hookResult;
    });

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should not create observer if element is null', () => {
    renderHook(() => useInView());

    // Observer should not be called without an element
    expect(mockObserve).not.toHaveBeenCalled();
  });
});
