import { useEffect, useState } from "react";

export default function Formulario({ voltar, onSalvar, dadosIniciais }) {
  const [formData, setFormData] = useState({
    nome: "",
    dataDeNascimento: "",
    instituicaoDeEnsino: "",
    anoTurma: "",
    paisResponsaveis: "",
    endereco: "",
    contato: "",
    dataDeAtendimento: "",
    modalidade: "",
    outroTexto: "",
    intervecao: "",
    acompanhamento: ""
  });
  useEffect(() => {
    if (dadosIniciais) {
      setFormData(dadosIniciais);
    }
  }, [dadosIniciais]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "modalidade") {
      setFormData({
        ...formData,
        modalidade: value,
        outroTexto: value !== "outro" ? "" : formData.outroTexto
      });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const areIntervencao = (e) => {
    const { name, type, checked } = e.target;
    setFormData({
      ...formData,
      intervecao: type === "checkbox" && checked ? name : ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(formData);
  };

  return (
    <div className="container my-5 p-4 shadow rounded bg-light">
      <h3 className="text-center mb-4">Formulário</h3>
      <h5 className="text-center mb-4">
        Ficha de Acompanhamento do Núcleo de Mediação Socioescolar - NUMESE
      </h5>

      <form onSubmit={handleSubmit}>
        <fieldset className="mb-4">
          <legend className="fs-5">Informações Pessoais</legend>
          <div className="row g-3">
            <div className="col-md-6">
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label>Data de Nascimento</label>
              <input
                type="date"
                name="dataDeNascimento"
                value={formData.dataDeNascimento}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label>Instituição de Ensino</label>
              <input
                type="text"
                name="instituicaoDeEnsino"
                value={formData.instituicaoDeEnsino}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label>Ano/Turma</label>
              <input
                type="text"
                name="anoTurma"
                value={formData.anoTurma}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label>Pais/Responsável</label>
              <input
                type="text"
                name="paisResponsaveis"
                value={formData.paisResponsaveis}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label>Endereço</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label>Contato Telefônico</label>
              <input
                type="tel"
                name="contato"
                value={formData.contato}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label>Data de Atendimento</label>
              <input
                type="date"
                name="dataDeAtendimento"
                value={formData.dataDeAtendimento}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="mb-4">
          <legend className="fs-5">Modalidade de Atendimento</legend>
          <div className="row">
            {[{ value: "presencial", label: "Presencial" }, { value: "contatoTelefonico", label: "Contato Telefônico" }, { value: "outro", label: "Outro" }].map((item) => (
              <div key={item.value} className="col-md-4 mb-2 d-flex align-items-center">
                <div className="form-check me-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="modalidade"
                    value={item.value}
                    checked={formData.modalidade === item.value}
                    onChange={handleChange}
                    id={item.value}
                    required
                  />
                </div>
                <label className="form-check-label" htmlFor={item.value}>
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          {formData.modalidade === "outro" && (
            <div className="mt-3">
              <label>Descreva a outra modalidade</label>
              <input
                type="text"
                name="outroTexto"
                value={formData.outroTexto}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          )}
        </fieldset>

        <fieldset className="mb-4">
          <legend className="fs-5">Área de Intervenção</legend>
          <div className="row">
            {["psicologico", "social", "multiprofissional"].map((item) => (
              <div
                key={item}
                className="col-md-4 mb-2 d-flex align-items-center"
              >
                <div className="form-check me-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={item}
                    checked={formData.intervecao === item}
                    onChange={areIntervencao}
                    id={item}
                  />
                </div>
                <label className="form-check-label" htmlFor={item}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-4">
          <legend className="fs-5">Motivo do Acompanhamento</legend>
          <div className="row">
            <div className="col-md-6">
              <select
                className="form-select"
                name="acompanhamento"
                value={formData.acompanhamento}
                onChange={handleChange}
                aria-label="Selecione o motivo do acompanhamento"
                required
              >
                <option value="">Selecione o motivo</option>
                <option value="Acompanhamento psicológico">Acompanhamento psicológico</option>
                <option value="Acompanhamento social">Acompanhamento social</option>
                <option value="busca Ativa">Busca ativa escolar</option>
                <option value="Acompanhamento e monitoramento de frequência escolar">Acompanhamento e monitoramento de frequência escolar</option>
                <option value="Mediação de conflito">Mediação de conflito</option>
                <option value="Ações coletivas">Ações coletivas</option>
                <option value="Acompanhamento individual">Acompanhamento individual</option>
                <option value="Acompanhamento de caso">Acompanhamento de caso</option>
                <option value="Acompanhamento familiar">Acompanhamento familiar</option>
                <option value="Encaminhamento para a rede">Encaminhamento para a rede</option>
                <option value="Acolhimento de servidores">Acolhimento de servidores</option>
                <option value="Acompanhamento de adolescentes do PROAMA">Acompanhamento de adolescentes do PROAMA</option>
                <option value="Escuta especializada">Escuta especializada</option>
              </select>
            </div>
          </div>
        </fieldset>
        <div className="mb-3">
  <label htmlFor="descricaoAcompanhamento" className="form-label">
    Descrição de Acompanhamento
  </label>
  <textarea 
    className="form-control"
    id="descricaoAcompanhamento"
    rows="3"
    value={formData.descricaoAcompanhamento || ""}
    onChange={(e) =>
      setFormData({ ...formData, descricaoAcompanhamento: e.target.value })
    }
  ></textarea>
</div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary px-5 me-3">
            Salvar
          </button>
          <button type="button" className="btn btn-secondary px-5" onClick={voltar}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}
