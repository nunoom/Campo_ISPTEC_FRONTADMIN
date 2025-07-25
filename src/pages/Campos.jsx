// src/pages/Campos.jsx
import React from 'react';
import '../components/Campos.css';
export default function Campos() {
    return (
      <div className="campos">
        <h2>Gestão de Campos</h2>
        <p>Visualize e gerencie os campos disponíveis no ISPTEC.</p>
  
        <div className="campo-lista">
          <div className="campo-card">
            <h3>Campo 1</h3>
            <p>Futsal · Capacidade: 12 jogadores</p>
            <button>Editar</button>
          </div>
          <div className="campo-card">
            <h3>Campo 2</h3>
            <p>Basquete · Capacidade: 10 jogadores</p>
            <button>Editar</button>
          </div>
          <div className="campo-card">
            <h3>Campo 3</h3>
            <p>Voleibol · Capacidade: 12 jogadores</p>
            <button>Editar</button>
          </div>
          {/* Adicione mais cards conforme necessário */}
        </div>
      </div>
    );
  }
