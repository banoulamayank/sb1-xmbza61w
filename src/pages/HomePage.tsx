import Hero from '../components/Hero';
import VideoCarousel from '../components/VideoCarousel';
import Features from '../components/Features';
import ArticlesPreview from '../components/ArticlesPreview';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <VideoCarousel />
      <Features />
      <ArticlesPreview />
      <Stats />
      <Testimonials />
      <Contact />
    </>
  );
};

export default HomePage;
