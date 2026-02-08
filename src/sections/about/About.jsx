import { useInView } from '../../hooks/useInView';
import globalStyles from '../../App.module.css';
import styles from './About.module.css';

function About() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="about" className={globalStyles.section}>
      <div
        ref={ref}
        className={`${globalStyles.section_content} ${isInView ? globalStyles.animate_visible : globalStyles.animate_hidden}`}
      >
        <h2 className={styles.title}>About Me</h2>
        <p className={styles.description}>
          I&#39;m a Software Engineer with 5 years of experience building solutions across the full
          stack—from CI/CD pipelines and cloud infrastructure to responsive web applications. My
          journey through DevOps, Middleware, and Frontend development has shaped me into a
          versatile engineer who thrives on solving problems at every layer.
        </p>
        <p className={styles.description}>
          I&#39;m currently seeking opportunities where I can leverage my technical breadth and
          collaborative approach to build impactful products.
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
            <li className={styles.skill_item}>Nginx</li>
            <li className={styles.skill_item}>Git</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
