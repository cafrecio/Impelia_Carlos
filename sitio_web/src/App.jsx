import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import PilotoPage from './pages/PilotoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/piloto" element={<PilotoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
