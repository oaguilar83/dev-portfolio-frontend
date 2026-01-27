import RoundImage from '../common/RoundImage';
import SocialMedia from '../common/SocialMedia';
import globalStyles from '../../App.module.css';
import styles from './Home.module.css';

function Home() {
  return (
    <section id="home" className={globalStyles.section}>
      <div className={globalStyles.section_content}>
        <div className={styles.image_text_content}>
          <RoundImage image="images/profile_picture.jpeg" />
          <div className={styles.text}>
            <h1 className={styles.text_title}>Hello, World!<br></br>I'm Oscar Aguilar</h1>
            <h2 className={styles.text_subtitle}>Software Developer</h2>
            <p className={styles.text_description}>
              Problem-solver who codes. I thrive on dissecting complex challenges, learning whatever it takes to solve them, and emerging with sharper skills than when I started.
            </p>
          </div>
        </div>
        <SocialMedia />
      </div>
    </section>
  );
}

export default Home;
