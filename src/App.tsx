import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VideoTutorialsPage from './pages/VideoTutorialsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <HomePage />
                <Footer />
              </>
            }
          />
          <Route
            path="/video-tutorials"
            element={<VideoTutorialsPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
