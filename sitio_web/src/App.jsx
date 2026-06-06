import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import PilotoPage from './pages/PilotoPage';

export default function App() {
  const basename = window.location.pathname.startsWith('/impulso-ia') ? '/impulso-ia' : '/';

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/piloto" element={<PilotoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
