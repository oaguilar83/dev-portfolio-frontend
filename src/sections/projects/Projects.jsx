import { useState } from 'react';
import styles from './Projects.module.css';
import globalStyles from '../../App.module.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const projects = [
  {
    id: 1,
    title: 'Dev Portfolo',
    description: 'A comprehensive developer portfolio project showcasing frontend development and infrastructure automation skills.',
    tech: ['React', 'JavaScript', 'HTML5', 'CSS3', 'AWS', 'Terraform', 'Ansible', 'GitHub Actions'],
    link: 'https://www.oscaraguilardev.com/',
    github: 'https://github.com/oaguilar83/dev-portfolio',
  },
];

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentProject = projects[currentIndex];

  return (
    <section id="projects" className={globalStyles.section}>
      <div className={globalStyles.section_content}>
        <h1 className={styles.title}>Projects</h1>

        <div className={styles.carousel_container}>
          <div className={styles.tile}>
            <div className={styles.tile_content}>
              <h3 className={styles.tile_title}>{currentProject.title}</h3>
              <p className={styles.tile_description}>{currentProject.description}</p>
              <div className={styles.tech_stack}>
                {currentProject.tech.map((tech, index) => (
                  <span key={index} className={styles.tech_tag}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className={styles.project_links}>
                <a
                  href={currentProject.link}
                  className={styles.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
                <a
                  href={currentProject.github}
                  className={styles.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.carousel_indicators}>
          {projects.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.indicator_active : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
        <div className={styles.arrow_button_container}>
          <button
            className={styles.arrow_button}
            onClick={goToPrevious}
            aria-label="Previous project"
          >
            <ArrowBackIosNewIcon />
          </button>
          <button
            className={styles.arrow_button}
            onClick={goToNext}
            aria-label="Next project"
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Projects;
