import PropTypes from 'prop-types';
import styles from './RoundImage.module.css';

function RoundImage({ image, alt }) {
  return (
    <div className={styles.image}>
      <img className={styles.image_round} src={image} alt={alt} loading="lazy" />
    </div>
  );
}

RoundImage.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default RoundImage;
