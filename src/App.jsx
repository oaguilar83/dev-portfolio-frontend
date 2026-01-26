import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main>
        <Home />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
