import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { ConverterPage } from './pages/ConverterPage';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/convert" element={<ConverterPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
