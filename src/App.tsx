import Header from './components/Header';
import Hero from './components/Hero';
import VideoTutorials from './components/VideoTutorials';
import Features from './components/Features';
import Stats from './components/Stats';
import Courses from './components/Courses';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <VideoTutorials />
      <Features />
      <Stats />
      <Courses />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
