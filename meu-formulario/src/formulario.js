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
    modalidade: "", // Novo campo para armazenar a modalidade selecionada
    outroTexto: "",
    intervecao:"",
    acompanhamento:"",
    outroTexto2:""
  });


  const areIntervencao = (e) => {
    const {name, value, type, checked} = e.target;
    if(type === "checkbox") {
      setFormData({
        ...formData,
        intervecao: checked ? name : "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }
  const motivoAcomponhamento= (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        acompanhamento: checked ? name : "", // Apenas um checkbox pode estar marcado
        outroTexto2: name === "outro2" && checked ? formData.outroTexto2 : "" // Limpa o campo "Outro" se desmarcado
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };




  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        modalidade: checked ? name : "", // Apenas um checkbox pode estar marcado
        outroTexto: name === "outro" && checked ? formData.outroTexto : "" // Limpa o campo "Outro" se desmarcado
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
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
          
          {/* Modalidade de Atendimento */}
          <h5 className="mt-4">MODALIDADE DE ATENDIMENTO</h5>
          <div className="row">
            <div className="col-md-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="presencial"
                checked={formData.modalidade === "presencial"}
                onChange={handleChange}
                id="presencial"
              />
              <label className="form-check-label ml-1" htmlFor="presencial">
                Presencial
              </label>
            </div>

            <div className="col-md-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="contatoTelefonico"
                checked={formData.modalidade === "contatoTelefonico"}
                onChange={handleChange}
                id="contatoTelefonico"
              />
              <label className="form-check-label ml-1" htmlFor="contatoTelefonico">
                Contato Telefônico
              </label>
            </div>
            
            <div className="col-md-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="outro"
                checked={formData.modalidade === "outro"}
                onChange={handleChange}
                id="outro"
              />
              <label className="form-check-label ml-1" htmlFor="outro">
                Outro
              </label>

              {formData.modalidade === "outro" && (
                <input
                  type="text"
                  className="form-control mt-2"
                  name="outroTexto"
                  value={formData.outroTexto}
                  onChange={handleChange}
                  placeholder="Especifique..."
                />
              )}
            </div>
          </div>


          <h5 className="mt-4">ÁREA DE INTERVENÇÃO</h5>
          <div className="row">
            <div className="col-md-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="psicologico"
                checked={formData.intervecao === "psicologico"}
                onChange={areIntervencao}
                id="psicologico"
              />
              <label className="form-check-label ml-1" htmlFor="psicologico">
                psicologico
              </label>
            </div>

            <div className="col-md-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="social"
                checked={formData.intervecao === "social"}
                onChange={areIntervencao}
                id="social"
              />
              <label className="form-check-label ml-1" htmlFor="social">
                social
              </label>
            </div>
            
            <div className="col-md-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="multiprofissional"
                checked={formData.intervecao === "multiprofissional"}
                onChange={areIntervencao}
                id="multiprofissional"
              />
              <label className="form-check-label ml-1" htmlFor="multiprofissional">
                multiprofissional
              </label>

            </div>
          </div>
          <h5 className="mt-4">MOTIVO DO ACOMPANHAMENTO:</h5>
          <div className="row">
            <div className="col-md-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="acomPsicologico"
                checked={formData.acompanhamento === "acomPsicologico"}
                onChange={motivoAcomponhamento}
                id="acomPsicologico"
              />
              <label className="form-check-label ml-1" htmlFor="acomPsicologico">
                Acompanhamento psicologico
              </label>
            </div>

            <div className="col-md-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="acomSocial"
                checked={formData.acompanhamento === "acomSocial"}
                onChange={motivoAcomponhamento}
                id="acomSocial"
              />
              <label className="form-check-label ml-1" htmlFor="acomSocial">
                Acompanhamento Social
              </label>
            </div>

            <div className="col-md-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="buscaAtiva"
                checked={formData.acompanhamento === "buscaAtiva"}
                onChange={motivoAcomponhamento}
                id="buscaAtiva"
              />
              <label className="form-check-label ml-1" htmlFor="buscaAtiva">
                Busca Ativa Escolar
              </label>
            </div>
            
            <div className="col-md-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="outro2"
                checked={formData.acompanhamento === "outro2"}
                onChange={motivoAcomponhamento}
                id="outro2"
              />
              <label className="form-check-label ml-1" htmlFor="outro2">
                Outro
              </label>

              {formData.modalidade === "outro2" && (
                <input
                  type="text"
                  className="form-control mt-2"
                  name="outroTexto2"
                  value={formData.outroTexto2}
                  onChange={motivoAcomponhamento}
                  placeholder="Especifique..."
                />
              )}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Salvar
        </button>
      </form>
    </div>
  );
}
