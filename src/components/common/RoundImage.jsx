import styles from './RoundImage.module.css';

import PropTypes from 'prop-types';

function RoundImage({ image }) {
  return (
    <div className={styles.image}>
      <img className={styles.image_round} src={image} />
    </div>
  );
}

RoundImage.propTypes = {
  image: PropTypes.string.isRequired,
};

export default RoundImage;
