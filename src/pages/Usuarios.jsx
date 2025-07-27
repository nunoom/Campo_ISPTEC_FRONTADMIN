import React, { useState, useEffect } from 'react';
import './Usuarios.css';
import api from '../services/api';
import axios from 'axios';
import AnimatedList from '../components/AnimatedList/AnimatedList';

import { motion } from 'framer-motion';



const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({
    nomeCompleto: '',
    //email: '',
    senha: '',
    numeroEstudante: '',
    contacto: ''
  });

    const handleSalvarUsuario = () => {
        if (!novoUsuario.nomeCompleto || !novoUsuario.senha || !novoUsuario.numeroEstudante) {
          alert("Preencha todos os campos!");
          return;
        }
    
        axios.post('https://campo-isptec.onrender.com/api/admin/getUsers', novoUsuario)
        .then(response => {
            console.log('Usuário salvo com sucesso:', response.data);
            setUsuarios(prev => [...prev, response.data]); // atualiza a tabela
            setNovoUsuario({ nome: '', password: '', numeroEstudante: '', contacto: '' }); // limpa os campos
            setMostrarModal(false); // fecha o modal
          })
        .catch(error => {
            console.error('Erro ao salvar usuário:', error);
            alert("Erro ao salvar usuário.");
          });
      };
  
  
//   useEffect(() => {
//     axios.get('https://9a7fc5ee0eff.ngrok-free.app/api/getUsers')
//       .then(response => {
//         console.log('Usuários recebidos:', response.data);
//         setUsuarios(response.data);
//         if (Array.isArray(response.data)) {
//             setUsuarios(response.data);
//           } else {
//             console.error("Resposta inesperada:", response.data);
//             setUsuarios([]); // evita quebrar o código
//           }
//         //setUsuarios(response.data);
//       })
//       .catch(error => {
//         console.error('Erro ao buscar usuários:', error);
//       });
//   }, []);
useEffect(() => {
    axios.get('https://campo-isptec.onrender.com/api/admin/getUsers')
      .then(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else {
          console.error("Resposta inesperada:", data);
          setUsuarios([]); // evita erro de .filter
        }
      })
      .catch(error => {
        console.error('Erro ao buscar usuários:', error);
      });
  }, []);
  

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const items = usuariosFiltrados.map((usuario) => (
    <tr key={usuario.id}>
      <td>{usuario.nomeCompleto}</td>
      <td>{usuario.fullemail}</td>
      <td>{usuario.numeroEstudante}</td>
      <td>
        <button className="btn-editar">Editar</button>
        <button className="btn-remover">Remover</button>
      </td>
    </tr>
  ));

  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <h2>Gestão de Usuários</h2>
        <button className="btn-add" onClick={() => setMostrarModal(true)}>+ Novo Usuário</button>

      </div>
      {mostrarModal && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Criar Novo Usuário</h3>
          <input
            type="text"
            placeholder="Nome"
            value={novoUsuario.nome}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, nomeCompleto: e.target.value })}
          />
          {/* <input
            type="email"
            placeholder="Email"
            value={novoUsuario.email}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
          /> */}
          <input
            type="password"
            placeholder="Password (ex: admin, comum...)"
            value={novoUsuario.senha}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
          />
          <input
            type="text"
            placeholder="Matricula (ex: admin, comum...)"
            value={novoUsuario.numeroEstudante}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, numeroEstudante: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contacto (ex: admin, comum...)"
            value={novoUsuario.contacto}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, contacto: e.target.value })}
          />
          {/* <select
            value={novoUsuario.tipo}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, tipo: e.target.value })}
            >
            <option value="">Selecione o tipo</option>
            <option value="Administrador">Administrador</option>
            <option value="Técnico">Técnico</option>
          </select> */}

          <div className="modal-buttons">
            <button onClick={handleSalvarUsuario}>Salvar</button>
            <button onClick={() => setMostrarModal(false)}>Cancelar</button>
          </div>
        </div>
      </div>
    )}


      <input
        type="text"
        placeholder="🔍 Pesquisar usuário..."
        className="input-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <table className="usuarios-table">
    <tbody>
    <thead>
    <tr>
      <th>Nome</th>
      <th>Email</th>
      <th>Tipo</th>
      <th>Ações</th>
    </tr>
  </thead>
  <AnimatedList
    items={usuariosFiltrados}
    onItemSelect={(item, index) => console.log(item, index)}
    showGradients={true}
    enableArrowNavigation={true}
    displayScrollbar={true}
    renderItem={(usuario, index, isSelected) => (
      <tr key={usuario.id} className={isSelected ? "selected-row" : ""}>
        <td>{usuario.nomeCompleto}</td>
        <td>{usuario.fullemail}</td>
        <td>{usuario.numeroEstudante}</td>
        <td>
          <button>Editar</button>
          <button>Excluir</button>
        </td>
      </tr>
    )}
  />
</tbody>
</table>


  

    </div>
  );
};

export default Usuarios;
