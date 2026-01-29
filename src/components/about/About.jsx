import globalStyles from '../../App.module.css';
import styles from './About.module.css';

function About() {
  return (
    <section id="about" className={globalStyles.section}>
      <div className={globalStyles.section_content}>
        <h2 className={styles.title}>About Me</h2>
        <p className={styles.description}>
          I'm a Software Engineer with 5 years of experience in the automotive infotainment
          industry. I've worked across frontend, middleware, and DevOps teams, which has made me a
          versatile engineer who enjoys solving problems at every layer of the stack.
        </p>
        <p className={styles.description}>
          Looking for my next challenge in a Full Stack, Backend, Frontend, or DevOps role where I can
          bring both technical breadth and a collaborative mindset.
        </p>
        <div className={styles.skills}>
          <h2 className={styles.skills_title}>Skills</h2>
          <ul className={styles.skills_list}>
            <li className={styles.skill_item}>Java</li>
            <li className={styles.skill_item}>C++</li>
            <li className={styles.skill_item}>JavaScript</li>
            <li className={styles.skill_item}>HTML5</li>
            <li className={styles.skill_item}>CSS3</li>
            <li className={styles.skill_item}>PostgreSQL</li>
            <li className={styles.skill_item}>MongoDB</li>
            <li className={styles.skill_item}>AWS</li>
            <li className={styles.skill_item}>Spring Projects</li>
            <li className={styles.skill_item}>React</li>
            <li className={styles.skill_item}>Jenkins</li>
            <li className={styles.skill_item}>GitHub Actions</li>
            <li className={styles.skill_item}>Terraform</li>
            <li className={styles.skill_item}>Ansible</li>
            <li className={styles.skill_item}>Docker</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
