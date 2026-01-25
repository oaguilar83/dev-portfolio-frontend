import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import './App.css';
import About from './components/About';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Home />
        <Contact />
      </main>
      <footer className="footer">
        <p>&copy; 2026 Oscar Aguilar's Dev Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
