// src/pages/Reserva.jsx
import React from 'react';
import './Reservas.css';

export default function Reserva() {
  return (
    <div className="reserva-container">
      <h2 className="reserva-title">Reservas</h2>

      <div className="reserva-actions">
        <button className="reserva-button">Nova Reserva</button>
        <input
          type="text"
          placeholder="Pesquisar reserva..."
          className="reserva-search"
        />
      </div>

      <table className="reserva-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Usuário</th>
            <th>Campo</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>João Silva</td>
            <td>Campo A</td>
            <td>2025-07-20</td>
            <td>14:00</td>
            <td>Confirmado</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Ana Santos</td>
            <td>Campo B</td>
            <td>2025-07-21</td>
            <td>10:00</td>
            <td>Pendente</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
