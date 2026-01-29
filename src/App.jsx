import Navbar from './sections/navbar/Navbar';
import Home from './sections/home/Home';
import About from './sections/about/About';
import Projects from './sections/projects/Projects';
import Contact from './sections/contact/Contact';
import Footer from './sections/footer/Footer';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main>
        <Home />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
