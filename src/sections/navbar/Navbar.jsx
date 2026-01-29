import { useActiveSection, scrollToSection } from '../../hooks/useActiveSection';
import styles from './Navbar.module.css';

const SECTIONS = ['home', 'about', 'projects', 'contact'];

function Navbar() {
  const activeSection = useActiveSection(SECTIONS);

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
