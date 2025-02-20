import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Formulario() {
  const [formData, setFormData] = useState({
    nome: "",
    dataDeNascimento: "",
    instituicaoDeEnsino: "",
    anoTurma: "",
    paisResponsaveis: "",
    endereco: "",
    contato: "",
    dataDeAtendimento: "",
    presencial:false,
    contatoTelefonico: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2)); // Exibe o JSON formatado
  };

  return (
    <div className="container">
      <h2 className="formulario">Formulário</h2>
      <h4 className="">FICHA DE ACOMPANHAMENTO DO NÚCLEO DE MEDIAÇÃO SOCIOESCOLAR - NUMESE</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label>Data de Nascimento</label>
            <input
              type="date"
              name="dataDeNascimento"
              value={formData.dataDeNascimento}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label>Instituição de Ensino</label>
            <input
              type="text"
              name="instituicaoDeEnsino"
              value={formData.instituicaoDeEnsino}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label>Ano/Turma</label>
            <input
              type="text"
              name="anoTurma"
              value={formData.anoTurma}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label>Pais/responsável</label>
            <input
              type="text"
              name="paisResponsaveis"
              value={formData.paisResponsaveis}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label>Endereço</label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label>Contato telefônico</label>
            <input
              type="tel"
              name="contato"
              value={formData.contato}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label>Data de Atendimento</label>
            <input
              type="date"
              name="dataDeAtendimento"
              value={formData.dataDeAtendimento}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <h7 className="">MODALIDADE DE ATENDIMENTO</h7>
          <div className="col-md-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="presencial"
              checked={formData.aceitarTermos}
              onChange={handleChange}
              id="presencial"
            />
            <label className="form-check-label" htmlFor="presencial">
              Presencial
            </label>
          </div>
          <div className="col-md-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="contatoTelefonico"
              checked={formData.aceitarTermos}
              onChange={handleChange}
              id="contatoTelefonico"
            />
            <label className="form-check-label" htmlFor="contatoTelefonico">
              Contato Telefônico
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Salvar
        </button>
      </form>
    </div>
  );
}
