import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: '', path: '/' },
    { label: 'Campos', icon: '', path: '/campos' },
    { label: 'Usuários', icon: '', path: '/usuarios' },
    { label: 'Reservas', icon: '', path: '/reserva' },
    { label: 'Configurações', icon: '', path: '/configuracoes' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="https://www.isptec.co.ao/public/assets/img/Logo_2.webp" alt="ISPTEC-Logo" height="45px" className='isptecLogo'/>
        {/* <h2>Admin ISPTEC</h2> */}
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




