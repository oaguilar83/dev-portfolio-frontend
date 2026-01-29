import styles from './Navbar.module.css';

import { useState, useEffect } from 'react';

function Navbar() {
  const [activeSection, setSection] = useState('');

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'contact'];

    const handleScroll = () => {
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

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
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
