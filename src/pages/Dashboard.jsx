// src/components/Dashboard.jsx

import React from 'react';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Visão Geral</h2>
      
      <div className="cards-grid">
        <div className="dashboard-card">
          <h3>Total de Solicitações</h3>
          <p className="value">127</p>
        </div>

        <div className="dashboard-card">
          <h3>Em Andamento</h3>
          <p className="value">43</p>
        </div>

        <div className="dashboard-card">
          <h3>Finalizadas</h3>
          <p className="value">72</p>
        </div>

        <div className="dashboard-card">
          <h3>Pendentes</h3>
          <p className="value">12</p>
        </div>
      </div>

      <div className="section">
        <h3>Últimas Atividades</h3>
        <ul className="activity-list">
          <li>✔ Técnico Carlos finalizou montagem no Edifício A</li>
          <li>⏳ Esperando peça para laboratório de informática</li>
          <li>📦 Compra aprovada para novos cabos de rede</li>
          <li>➕ Nova solicitação registrada por João Mendes</li>
        </ul>
      </div>
    </div>
  );
}

