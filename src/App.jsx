// import React from 'react';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import Dashboard from './components/Dashboard';
// import './App.css';

// // App.jsx

// export default function App() {
//   return (
//     <div className="app-container">
//       <Sidebar />
//       <div className="main-content">
//         <Header />
//         <Dashboard />
//       </div>
//     </div>
//   );
// }

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

import Dashboard from './pages/Dashboard';
import Campos from './pages/Campos';
import Usuarios from './pages/Usuarios';
import Reserva from './pages/Reservas';
import LogIn from "./components/Login_Aurora"

import './App.css';

// export default function App() {
//   return (
//     <Router>
//       <div className="app-container">
//         <Sidebar />
//         <div className="main-content">
//           <Header />
//           <div className="page-content">
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/campos" element={<Campos />} />
//               <Route path="/usuarios" element={<Usuarios />} />
//               <Route path="/reserva" element={<Reserva />} />
              
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<LogIn />} />

          <Route
            path="/*"
            element={
              <>
                <Sidebar />
                <div className="main-content">
                  <Header />
                  <div className="page-content">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/campos" element={<Campos />} />
                      <Route path="/usuarios" element={<Usuarios />} />
                      <Route path="/reserva" element={<Reserva />} />
                    </Routes>
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
