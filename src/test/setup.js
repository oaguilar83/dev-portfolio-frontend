import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Set();
  }

  observe(element) {
    this.elements.add(element);
  }

  unobserve(element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  // Helper method to trigger intersection
  triggerIntersection(isIntersecting = true) {
    this.callback([{ isIntersecting }]);
  }
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock import.meta.env
vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'test_service_id');
vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'test_template_id');
vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'test_public_key');
