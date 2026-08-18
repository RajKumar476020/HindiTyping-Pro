import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConverterPage } from './pages/ConverterPage';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/convert" element={<ConverterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
