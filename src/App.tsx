import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VideoTutorialsPage from './pages/VideoTutorialsPage';
import ArticlesPage from './pages/ArticlesPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/video-tutorials" element={<VideoTutorialsPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
