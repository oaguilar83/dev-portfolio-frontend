import { useInView } from '../../hooks/useInView';
import RoundImage from '../../components/RoundImage';
import SocialMediaContainer from '../../components/SocialMediaContainer';
import globalStyles from '../../App.module.css';
import styles from './Home.module.css';

function Home() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="home" className={globalStyles.section}>
      <div
        ref={ref}
        className={`${globalStyles.section_content} ${isInView ? globalStyles.animate_visible : globalStyles.animate_hidden}`}
      >
        <div className={styles.image_text_content}>
          <div className={styles.image}>
            <RoundImage image="images/profile_picture.jpeg" alt="Handsome young man" />
          </div>
          <div className={styles.text}>
            <h1 className={styles.text_title}>Hello, World!<br></br>I&#39;m Oscar Aguilar</h1>
            <h2 className={styles.text_subtitle}>Software Developer</h2>
            <p className={styles.text_description}>
              Problem-solver who codes. I thrive on dissecting complex challenges, learning whatever it takes to solve them, and emerging with sharper skills than when I started.
            </p>
          </div>
        </div>
        <SocialMediaContainer />
      </div>
    </section>
  );
}

export default Home;
