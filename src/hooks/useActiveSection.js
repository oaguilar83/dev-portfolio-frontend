import { useState, useEffect, useRef } from 'react';

const DEBOUNCE_MS = 50;
const VIEWPORT_OFFSET_DIVISOR = 3;

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / VIEWPORT_OFFSET_DIVISOR;

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      if (timeoutRef.current) {
        return;
      }

      timeoutRef.current = setTimeout(() => {
        updateActiveSection();
        timeoutRef.current = null;
      }, DEBOUNCE_MS);
    };

    window.addEventListener('scroll', handleScroll);
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [sectionIds]);

  return activeSection;
}

export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
