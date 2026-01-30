import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useInView } from '../../hooks/useInView';
import { projects } from '../../data/projects';
import globalStyles from '../../App.module.css';
import styles from './Projects.module.css';

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, isInView] = useInView({ threshold: 0.1 });

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
      <div
        ref={ref}
        className={`${globalStyles.section_content} ${isInView ? globalStyles.animate_visible : globalStyles.animate_hidden}`}
      >
        <h1 className={styles.title}>Projects</h1>

        <div className={styles.carousel_container}>
          <div className={styles.tile}>
            <div className={styles.tile_content}>
              <div className={styles.tile_header}>
                <h3 className={styles.tile_title}>{currentProject.title}</h3>
                {currentProject.comingSoon && (
                  <span className={styles.coming_soon_badge}>Coming Soon</span>
                )}
              </div>
              <p className={styles.tile_description}>{currentProject.description}</p>
              {currentProject.tech.length > 0 && (
                <div className={styles.tech_stack}>
                  {currentProject.tech.map((tech, index) => (
                    <span key={index} className={styles.tech_tag}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {!currentProject.comingSoon && (
                <div className={styles.project_links}>
                  {currentProject.link && (
                    <a
                      href={currentProject.link}
                      className={styles.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  )}
                  {currentProject.github && (
                    <a
                      href={currentProject.github}
                      className={styles.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
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
