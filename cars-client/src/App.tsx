import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CarCreatePage } from './pages/CarCreatePage';
import { CarDetailsPage } from './pages/CarDetailsPage';
import { CarEditPage } from './pages/CarEditPage';
import { CarListPage } from './pages/CarListPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarListPage />} />
        <Route path="/cars/new" element={<CarCreatePage />} />
        <Route path="/cars/:id" element={<CarDetailsPage />} />
        <Route path="/cars/:id/edit" element={<CarEditPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
