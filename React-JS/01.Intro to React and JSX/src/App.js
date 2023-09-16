import './App.css';
import AboutSection from './components/AboutSection';
import BlogSection from './components/BlogSection';
import ClientSection from './components/ClientSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FurnitureSection from './components/FurnitureSection';
import Header from './components/Header';
import InfoSection from './components/InfoSection';
import SliderSection from './components/SliderSection';

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

      <Footer />
    </div>
  );
}

export default App;
