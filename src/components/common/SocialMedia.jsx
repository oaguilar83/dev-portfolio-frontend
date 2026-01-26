import styles from './SocialMedia.module.css';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function SocialMedia() {
  return (
    <div className={styles.social_media}>
      <a href="https://github.com/oaguilar83" target="_blank" rel="noreferrer"><GitHubIcon/></a>
      <a href="https://www.linkedin.com/in/oaguilar83/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
    </div>
  );
}

export default SocialMedia;
