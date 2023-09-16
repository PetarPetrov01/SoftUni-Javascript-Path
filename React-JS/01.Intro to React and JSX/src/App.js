import './App.css';
import AboutSection from './components/AboutSection';
import BlogSection from './components/BlogSection';
import ClientSection from './components/ClientSection';
import ContactSection from './components/ContactSection';
import Header from './components/Header';

function App() {
  return (
    <div>
      <div className='hero_area'>
        <Header />
        <SliderSection />
      </div>
      <FurnitureSection />

      <AboutSection />

      <BlogSection />

      <ClientSection />

      <ContactSection />
      <InfoSection />
    </div>
  );
}

export default App;
