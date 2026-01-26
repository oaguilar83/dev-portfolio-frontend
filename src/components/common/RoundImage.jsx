import styles from './RoundImage.module.css';

function RoundImage({ image }) {
  return (
    <div className={styles.image}>
      <img className={styles.image_round} src={image} />
    </div>
  );
}

export default RoundImage;
