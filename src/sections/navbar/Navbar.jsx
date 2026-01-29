import styles from './Navbar.module.css';

import { useState, useEffect, useRef } from 'react';

function Navbar() {
  const [activeSection, setSection] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'contact'];

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setSection(sectionId);
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
      }, 50);
    };

    window.addEventListener('scroll', handleScroll);
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar_links}>
        <li>
          <button
            className={`${styles.navbar_links_button} ${activeSection === 'home' ? styles.active_section : ''}`}
            onClick={() => scrollToSection('home')}>
              Home
          </button>
        </li>
        <li>
          <button
            className={`${styles.navbar_links_button} ${activeSection === 'about' ? styles.active_section : ''}`}
            onClick={() => scrollToSection('about')}>
              About
          </button>
        </li>
        <li>
          <button
            className={`${styles.navbar_links_button} ${activeSection === 'projects' ? styles.active_section : ''}`}
            onClick={() => scrollToSection('projects')}>
              Projects
          </button>
        </li>
        <li>
          <button
            className={`${styles.navbar_links_button} ${activeSection === 'contact' ? styles.active_section : ''}`}
            onClick={() => scrollToSection('contact')}>
              Contact
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
