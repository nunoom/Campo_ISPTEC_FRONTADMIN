import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <main className="dashboard">
      <h2>Bem-vindo, administrador!</h2>
      <p>Gerencie os campos desportivos, reservas e usuários da instituição de forma rápida e eficiente.</p>

      <section className="dashboard-cards">
        <div className="card">
          <h3>🏟️ Campos</h3>
          <p>Visualize e edite os campos disponíveis.</p>
        </div>
        <div className="card">
          <h3>📅 Reservas</h3>
          <p>Acompanhe as reservas feitas pelos usuários.</p>
        </div>
        <div className="card">
          <h3>👥 Usuários</h3>
          <p>Controle os perfis e permissões dos usuários.</p>
        </div>
      </section>
    </main>
  );
}
