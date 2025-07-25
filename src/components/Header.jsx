import React from 'react';
import './Header.css';
import { FiLogOut } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="title">Painel de Administração</h1>
        <div className="user-actions">
          <span className="username">Administrador</span>
          {/* <img
            src="https://via.placeholder.com/32"
            alt="Avatar"
            className="avatar"
          /> */}
          <button className="logout-button">
            <FiLogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
}
