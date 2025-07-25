import { Routes, Route } from 'react-router-dom';
import Campos from './pages/Campos';

<Routes>
  <Route path="/campos" element={<Campos />} />
  <Route path="/usuarios" element={<Usuarios />} />
  {/* outras rotas */}
</Routes>
