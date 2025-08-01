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
  const [mostrarModalNewUser, setMostrarModalNewUser] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  const [novoUsuario, setNovoUsuario] = useState({
    nomeCompleto: '',
    fullemail: '',
    senha: '',
    numeroEstudante: '',
    contacto: ''
  });

    const handleSalvarUsuario = () => {
        if (!novoUsuario.nomeCompleto || !novoUsuario.senha || !novoUsuario.numeroEstudante) {
          alert("Preencha todos os campos!");
          return;
        }
    
        axios.post('https://campo-isptec.onrender.com/api/register', novoUsuario)
        .then(response => {
            console.log('Usuário salvo com sucesso:', response.data);
            setUsuarios(prev => [...prev, response.data]); // atualiza a tabela
            setNovoUsuario({ nome: '', password: '', numeroEstudante: '', contacto: '' }); // limpa os campos
            setMostrarModalNewUser(false); // fecha o modal
          })
        .catch(error => {
            console.error('Erro ao salvar usuário:', error);
            alert("Erro ao salvar usuário.");
          });
      };
  
      const handleEditClick = (usuario) => {
        setUsuarioSelecionado(usuario);
        setMostrarModal(true);
      };
      const handleUpdateUsuario = () => {
        if (!usuarioSelecionado) return;
        const token = localStorage.getItem("token");
    
        //http://172.17.0.1
        // /https://campo-isptec.onrender.com
        axios
          .put(
            `https://campo-isptec.onrender.com/api/admin/updateUser/${usuarioSelecionado.id}`,
            usuarioSelecionado,
            {
        headers: {
        Authorization: `Bearer ${token}`, // se a API espera Bearer
        },
          }
          )
          .then((response) => {
            console.log("Usuário atualizado:", response.data);
            setUsuarios((prev) =>
              prev.map((u) =>
                u.id === usuarioSelecionado.id ? response.data : u
              )
            );
            setMostrarModal(false);
            setUsuarioSelecionado(null);
          })
          .catch((error) => {
            console.error("Erro ao atualizar usuário:", error);
            alert("Erro ao atualizar usuário.");
          });
      };
  

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
        <button className="btn-add" onClick={() => setMostrarModalNewUser(true)}>+ Novo Usuário</button>

      </div>
      {mostrarModalNewUser && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Criar Novo Usuário</h3>
          <input
            type="text"
            placeholder="Nome"
            value={novoUsuario.nome}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, nomeCompleto: e.target.value })}
          />
          
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

          <div className="modal-buttons">
            <button onClick={handleSalvarUsuario}>Salvar</button>
            <button onClick={() => setMostrarModalNewUser(false)}>Cancelar</button>
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
      <th>Número de Estudante</th>
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
          <button className="btn-editar" onClick={() => 
            
            handleEditClick(usuario)}>Editar</button>
          <button className="btn-remover">Excluir</button>
        </td>
      </tr>
    )}
  />
</tbody>
</table>
{mostrarModal && usuarioSelecionado && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Editar Usuário</h2>

            <input
              type="text"
              value={usuarioSelecionado.nomeCompleto}
              onChange={(e) =>
                setUsuarioSelecionado({
                  ...usuarioSelecionado,
                  nomeCompleto: e.target.value,
                })
              }
              placeholder="Nome Completo"
            />

            <input
              type="email"
              value={usuarioSelecionado.fullemail}
              onChange={(e) =>
                setUsuarioSelecionado({
                  ...usuarioSelecionado,
                  fullemail: e.target.value,
                })
              }
              placeholder="Email"
            />

            <input
              type="text"
              value={usuarioSelecionado.numeroEstudante}
              onChange={(e) =>
                setUsuarioSelecionado({
                  ...usuarioSelecionado,
                  numeroEstudante: e.target.value,
                })
              }
              placeholder="Número de Estudante"
            />
            <input
              type="text"
              value={usuarioSelecionado.contacto}
              onChange={(e) =>
                setUsuarioSelecionado({
                  ...usuarioSelecionado,
                  contacto: e.target.value,
                })
              }
              placeholder="Contacto"
            />

            <div className="modal-actions">
              <button onClick={handleUpdateUsuario}>Salvar</button>
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

  

    </div>
  );
};

export default Usuarios;
