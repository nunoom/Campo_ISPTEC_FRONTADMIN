// src/pages/Reserva.jsx
import "./Reservas.css";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import AnimatedList from '../components/AnimatedList/AnimatedList';

const Marcacao = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [marcacao, setMarcacao] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalNovaMarcacao, setMostrarModalNovaMarcacao] =
    useState(false);
  const [marcacaoSelecionado, setMarcacaoSelecionado] = useState(null);

  const [novaMarcacao, setNovaMarcacao] = useState({
    titulo: "",
    tipo: "",
    dataInicio: "",
    dataFim: "",
    Evento: {
      create: {
        nome: "",
        contacto: "",
        email: "",
        tipoEvento: "",
        dataInicio: "",
        dataFim: "",
        formato: "",
      },
    },
  });

  const handleSalvarMarcacao = () => {
    if (
      !novaMarcacao.titulo ||
      !novaMarcacao.tipo ||
      !novaMarcacao.dataInicio ||
      !novaMarcacao.dataFim
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    axios
      .post("https://campo-isptec.onrender.com/api/register", novaMarcacao)
      .then((response) => {
        console.log("Marcacao salva com sucesso:", response.data);
        setMarcacao((prev) => [...prev, response.data]); // atualiza a tabela
        setNovaMarcacao({ titulo: "", tipo: "", dataInicio: "", dataFim: "" }); // limpa os campos
        setMostrarModalNovaMarcacao(false); // fecha o modal
      })
      .catch((error) => {
        console.error("Erro ao salvar Marcacao:", error);
        alert("Erro ao salvar Marcacao.");
      });
  };
  const handleEditClick = (usuario) => {
    setMarcacaoSelecionado(usuario);
    setMostrarModal(true);
  };

  const handleUpdateMarcacao = () => {
    if (!marcacaoSelecionado) return;
    const token = localStorage.getItem("token");

    //http://172.17.0.1
    // /https://campo-isptec.onrender.com
    axios
      .put(
        `https://campo-isptec.onrender.com/api/admin/updateUser/${marcacaoSelecionado.id}`,
        marcacaoSelecionado,
        {
          headers: {
            Authorization: `Bearer ${token}`, // se a API espera Bearer
          },
        }
      )
      .then((response) => {
        console.log("Marcacao atualizada:", response.data);
        setMarcacao((prev) =>
          prev.map((u) => (u.id === marcacaoSelecionado.id ? response.data : u))
        );
        setMostrarModal(false);
        setMarcacaoSelecionado(null);
      })
      .catch((error) => {
        console.error("Erro ao atualizar marcacao:", error);
        alert("Erro ao atualizar marcacao.");
      });
  };

  useEffect(() => {
    axios
      .get("https://campo-isptec.onrender.com/api/marcacoes")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setMarcacao(data);
        } else {
          console.error("Resposta inesperada:", data);
          setMarcacao([]); // evita erro de .filter
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
  }, []);
  const MarcacoesFiltradas = marcacao.filter((marcacao) =>
    marcacao.titulo .toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <h2>Gestão de Marcacoes</h2>
        <button
          className="btn-add"
          onClick={() => setMostrarModalNovaMarcacao(true)}
        >
          + Nova Marcacao
        </button>
      </div>
      {mostrarModalNovaMarcacao && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Criar Nova Marcacao</h3>
            <input
              type="text"
              placeholder="Nome"
              value={novaMarcacao.nome}
              onChange={(e) =>
                setNovaMarcacao({ ...novaMarcacao, titulo: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Password (ex: admin, comum...)"
              value={novaMarcacao.senha}
              onChange={(e) =>
                setNovaMarcacao({ ...novaMarcacao, tipo: e.target.value })
              }
            />
            <input
              type="date"
              placeholder="Matricula (ex: admin, comum...)"
              value={novaMarcacao.dataInicio}
              onChange={(e) =>
                setNovaMarcacao({
                  ...novaMarcacao,
                  numeroEstudante: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Contacto (ex: admin, comum...)"
              value={novaMarcacao.contacto}
              onChange={(e) =>
                setNovaMarcacao({ ...novaMarcacao, contacto: e.target.value })
              }
            />

            <div className="modal-buttons">
              <button onClick={handleSalvarMarcacao}>Salvar</button>
              <button onClick={() => setMostrarModalNovaMarcacao(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="🔍 Pesquisar Marcacao..."
        className="input-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="usuarios-table">
        <tbody>
          <thead>
            <tr>
              <th>Titulo da Marcacao</th>
              <th>Modalidade</th>
              <th>Data de Inicio</th>
              <th>Data de Fim</th>
              <th>Ações</th>
            </tr>
          </thead>
          <AnimatedList
            items={MarcacoesFiltradas}
            onItemSelect={(item, index) => console.log(item, index)}
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={true}
            renderItem={(marcacao, index, isSelected) => (
              <tr key={marcacao.id} className={isSelected ? "selected-row" : ""}>
                <td>{marcacao.titulo}</td>
                <td>{marcacao.tipo}</td>
                <td>{marcacao.dataInicio}</td>
                <td>{marcacao.dataFim}</td>
                <td>
                  <button
                    className="btn-editar"
                    onClick={() => handleEditClick(marcacao)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-editar"
                    onClick={() => handleEditClick(marcacao)}
                  >
                    Ver Evento
                  </button>
                  <button className="btn-remover">Excluir</button>
                </td>
              </tr>
            )}
          />
        </tbody>
      </table>
      {mostrarModal && marcacaoSelecionado && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Editar Marcacao</h2>

            <input
              type="text"
              value={marcacaoSelecionado.titulo}
              onChange={(e) =>
                setMarcacaoSelecionado({
                  ...marcacaoSelecionado,
                  titulo: e.target.value,
                })
              }
              placeholder="Titulo"
            />

            <input
              type="text"
              value={marcacaoSelecionado.tipo}
              onChange={(e) =>
                setMarcacaoSelecionado({
                  ...marcacaoSelecionado,
                  tipo: e.target.value,
                })
              }
              placeholder="Tipo"
            />

            <input
              type="text"
              value={marcacaoSelecionado.numeroEstudante}
              onChange={(e) =>
                setMarcacaoSelecionado({
                  ...marcacaoSelecionado,
                  numeroEstudante: e.target.value,
                })
              }
              placeholder="Número de Estudante"
            />
            <input
              type="text"
              value={marcacaoSelecionado.contacto}
              onChange={(e) =>
                setMarcacaoSelecionado({
                  ...marcacaoSelecionado,
                  dataInicio: e.target.value,
                })
              }
              placeholder="Data de Inicio"
            />
            <input
              type="text"
              value={marcacaoSelecionado.contacto}
              onChange={(e) =>
                setMarcacaoSelecionado({
                  ...marcacaoSelecionado,
                  dataFim: e.target.value,
                })
              }
              placeholder="Data de Fim"
            />

            <div className="modal-actions">
              <button onClick={handleUpdateMarcacao}>Salvar</button>
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marcacao;
// export default function Reserva() {
//   return (
//     <div className="reserva-container">
//       <h2 className="reserva-title">Reservas</h2>

//       <div className="reserva-actions">
//         <button className="reserva-button">Nova Reserva</button>
//         <input
//           type="text"
//           placeholder="Pesquisar reserva..."
//           className="reserva-search"
//         />
//       </div>

//       <table className="reserva-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Usuário</th>
//             <th>Campo</th>
//             <th>Data</th>
//             <th>Hora</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>1</td>
//             <td>João Silva</td>
//             <td>Campo A</td>
//             <td>2025-07-20</td>
//             <td>14:00</td>
//             <td>Confirmado</td>
//           </tr>
//           <tr>
//             <td>2</td>
//             <td>Ana Santos</td>
//             <td>Campo B</td>
//             <td>2025-07-21</td>
//             <td>10:00</td>
//             <td>Pendente</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
