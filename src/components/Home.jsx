import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Home() {
  return (
    <section id="home" className="section home-section">
      <div className="section-content">
        <div className="home-content">
          <div className="image-container">
            <img className="round-image" src="src/assets/profile_picture.jpeg"></img>
          </div>
          <div className="text-container">
            <h1>Hello, World!<br></br>I'm Oscar Aguilar</h1>
            <p className="subtitle">Software Developer</p>
            <p className="description">
              I build modern web applications with clean code and great user experiences.
              Passionate about creating solutions that make a difference.
            </p>
          </div>
        </div>
        <div className="social-media-container">
            <a href="https://github.com/oaguilar83" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/oaguilar83/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
        </div>
      </div>
    </section>
  );
}

export default Home;
