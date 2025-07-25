// import React from 'react';
// import './Sidebar.css';
// import { Link } from 'react-router-dom';

// export default function Sidebar() {
//   return (
//     <aside className="sidebar">
//       <div className="sidebar-header">
//         <h2>Admin ISPTEC</h2>
//       </div>
//       <nav className="sidebar-nav">
//         <ul>
//             <li><Link to="/"> <i classname="icon">🏠Dashboard</i></Link></li>
//             <li><Link to="/campos"><i className="icon">👥Campos</i></Link></li>
//             <li><Link to="/usuarios"><i className="icon">📅Usuários</i></Link></li>
//             <Link to="/reserva">Reservas</Link>
            
//             <li><i className="icon">⚙️</i> Configurações</li>
//         </ul>
//       </nav>
//     </aside>
//   );
// }

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './Sidebar.css';

// export default function Sidebar() {
//   const location = useLocation();

//   return (
//     <aside className="sidebar">
//       <div className="sidebar-header">
//         <h2>Admin ISPTEC</h2>
//       </div>
//       <nav className="sidebar-nav">
//         <ul>
//           <li className={location.pathname === '/' ? 'active' : ''}>
//             <Link to="/"><i className="icon">🏠</i> Dashboard</Link>
//           </li>
//           <li className={location.pathname === '/campos' ? 'active' : ''}>
//             <Link to="/campos"><i className="icon">👥</i> Campos</Link>
//           </li>
//           <li className={location.pathname === '/usuarios' ? 'active' : ''}>
//             <Link to="/usuarios"><i className="icon">📅</i> Usuários</Link>
//           </li>
//           <li className={location.pathname === '/reserva' ? 'active' : ''}>
//             <Link to="/reserva"><i className="icon">📆</i> Reservas</Link>
//           </li>
//           <li><i className="icon">⚙️</i> Configurações</li>
//         </ul>
//       </nav>
//     </aside>
//   );
// }

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: '🏠', path: '/' },
    { label: 'Campos', icon: '👥', path: '/campos' },
    { label: 'Usuários', icon: '📅', path: '/usuarios' },
    { label: 'Reservas', icon: '📆', path: '/reserva' },
    { label: 'Configurações', icon: '⚙️', path: '/configuracoes' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Admin ISPTEC</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(item => (
            <li
              key={item.path}
              className={`nav-item ${
                location.pathname === item.path ? 'active' : ''
              }`}
            >
              <Link to={item.path} className="nav-link">
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}




