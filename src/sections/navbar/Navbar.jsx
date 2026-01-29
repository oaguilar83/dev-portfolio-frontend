import styles from './Navbar.module.css';

import { useState } from 'react';

function Navbar() {
  const [activeLink, setActiveLink] = useState('home');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveLink(sectionId);
    }
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar_links}>
        <li>
          <button
            className={`${styles.navbar_links_button} ${activeLink === 'home' ? styles.active_link : ''}`}
            onClick={() => scrollToSection('home')}>
              Home
          </button>
        </li>
        <li>
          <button
            className={`${styles.navbar_links_button} ${activeLink === 'about' ? styles.active_link : ''}`}
            onClick={() => scrollToSection('about')}>
              About
          </button>
        </li>
        <li>
          <button
            className={`${styles.navbar_links_button} ${activeLink === 'projects' ? styles.active_link : ''}`}
            onClick={() => scrollToSection('projects')}>
              Projects
          </button>
        </li>
        <li>
          <button
            className={`${styles.navbar_links_button} ${activeLink === 'contact' ? styles.active_link : ''}`}
            onClick={() => scrollToSection('contact')}>
              Contact
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
