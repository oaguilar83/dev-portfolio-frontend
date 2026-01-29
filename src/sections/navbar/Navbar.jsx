import styles from './Navbar.module.css';

function Navbar() {
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
          <button className={styles.navbar_links_button} onClick={() => scrollToSection('home')}>Home</button>
        </li>
        <li>
          <button className={styles.navbar_links_button} onClick={() => scrollToSection('about')}>About</button>
        </li>
        <li>
          <button className={styles.navbar_links_button} onClick={() => scrollToSection('projects')}>Projects</button>
        </li>
        <li>
          <button className={styles.navbar_links_button} onClick={() => scrollToSection('contact')}>Contact</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
