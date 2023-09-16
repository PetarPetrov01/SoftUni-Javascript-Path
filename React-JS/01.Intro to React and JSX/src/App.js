import './App.css';
import AboutSection from './components/AboutSection';
import BlogSection from './components/BlogSection';
import Header from './components/Header';

function App() {
  return (
    <div>
      <div className='hero_area'>
        <Header />
      </div>
      <AboutSection />

      <BlogSection />
    </div>
  );
}

export default App;
