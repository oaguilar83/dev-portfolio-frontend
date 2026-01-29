import { Toaster } from 'react-hot-toast';
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
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ECEFF1',
            color: '#0F0F0F',
            border: '1px solid #333',
          },
          success: {
            iconTheme: {
              primary: '#4fc3f7',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#F44336',
              secondary: 'white',
            },
          },
        }}
      />
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
