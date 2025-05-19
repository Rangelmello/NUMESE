import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // import correto



export default function PessoasCadastradas({ pessoas, voltar, editarPessoa, excluirPessoa }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [pessoaSelecionada, setPessoaSelecionada] = useState(null);
  const [animarModal, setAnimarModal] = useState(false);

  const salvarNoLocalStorage = () => {
    localStorage.setItem("pessoasCadastradas", JSON.stringify(pessoas));
    alert("Pessoas salvas no localStorage!");
  };

  // Abrir modal e animar
  const abrirModalHistorico = (pessoa) => {
    setPessoaSelecionada(pessoa);
    setModalAberto(true);
  };

  // Fechar modal com delay para animação
  const fecharModal = () => {
    setAnimarModal(false);
    setTimeout(() => {
      setModalAberto(false);
      setPessoaSelecionada(null);
    }, 300);
  };

  // Ativa animação ao abrir modal
  useEffect(() => {
    if (modalAberto) {
      setTimeout(() => setAnimarModal(true), 10);
    }
  }, [modalAberto]);

  // Função para gerar PDF do histórico da pessoa
  const gerarPDFHistorico = (pessoa) => {
    const doc = new jsPDF("l", "mm", "a4"); // modo paisagem para mais largura

    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString("pt-BR");
    const horaFormatada = dataAtual.toLocaleTimeString("pt-BR");
    // Título
    doc.setFontSize(14);
    doc.setFontSize(11);
    doc.text(`Nome: ${pessoa.dados.nome}`, 14, 23);
    
    doc.text(`Histórico de versões - ${pessoa.dados.nome}`, 14, 15);

    // Rodapé com data/hora
    const rodape = `Gerado em: ${dataFormatada} às ${horaFormatada}`;
    doc.setFontSize(9);
    doc.text(rodape, 14, 285); // Posição próxima do rodapé


    const head = [[
      "Nome",
      "Data de Nascimento",
      "Instituição",
      "Ano/Turma",
      "Responsável",
      "Endereço",
      "Contato",
      "Data Atendimento",
      "Modalidade",
      "Intervenção",
      "Motivo",
      "Descrição do Acompanhamento",
    ]];

    const historico = pessoa.historico.map((versao) => [
      versao.nome,
      versao.dataDeNascimento,
      versao.instituicaoDeEnsino,
      versao.anoTurma,
      versao.paisResponsaveis,
      versao.endereco,
      versao.contato,
      versao.dataDeAtendimento,
      versao.modalidade === "outro" ? versao.outroTexto : versao.modalidade,
      versao.intervecao,
      versao.acompanhamento,
      versao.descricaoAcompanhamento,
    ]);
    const versaoAtual = [
      pessoa.dados.nome,
      pessoa.dados.dataDeNascimento,
      pessoa.dados.instituicaoDeEnsino,
      pessoa.dados.anoTurma,
      pessoa.dados.paisResponsaveis,
      pessoa.dados.endereco,
      pessoa.dados.contato,
      pessoa.dados.dataDeAtendimento,
      pessoa.dados.modalidade === "outro" ? pessoa.dados.outroTexto : pessoa.dados.modalidade,
      pessoa.dados.intervecao,
      pessoa.dados.acompanhamento,
      pessoa.dados.descricaoAcompanhamento,
    ];
    const body = [...historico, versaoAtual]; 

    autoTable(doc, {
      head,
      body,
      startY: 30,
      styles: {
        fontSize: 7,
        cellPadding: 4, // espaço interno
        valign: 'middle',
        overflow: 'linebreak', // quebra de linha automática
        minCellHeight: 10,
      },
      headStyles: {
        fillColor: [52, 152, 219],
        textColor: [255, 255, 255],
        fontSize: 7,
      },
      theme: 'grid',
      margin: { top: 30, bottom: 20 },
      didDrawPage: (data) => {
        doc.setFontSize(9);
        doc.text(rodape, data.settings.margin.left, 200); // ajustado para modo paisagem
      },
    });
  
    doc.save(`historico_${pessoa.dados.nome}.pdf`);
  };

  return (
    <div className="container-fluid my-5">
    

      <h3 className="text-center mb-4">Pessoas Cadastradas</h3>

      <div className="text-center mb-3">
        <button className="btn btn-success me-2" onClick={salvarNoLocalStorage}>
          Salvar no LocalStorage
        </button>
        <button className="btn btn-secondary" onClick={voltar}>
          Voltar para o Início
        </button>
      </div>

      {pessoas.length === 0 ? (
        <p className="text-center">Nenhuma pessoa cadastrada ainda.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered fs-6" style={{ minWidth: "1200px" }}>
            <thead className="table-primary">
              <tr>
                <th>Nome</th>
                <th>Data de Nascimento</th>
                <th>Instituição</th>
                <th>Ano/Turma</th>
                <th>Responsável</th>
                <th>Endereço</th>
                <th>Contato</th>
                <th>Data Atendimento</th>
                <th>Modalidade</th>
                <th>Intervenção</th>
                <th>Motivo</th>
                <th>Descrição do Acompanhamento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((pessoa, index) => (
                <tr key={index}>
                  <td>{pessoa.dados.nome}</td>
                  <td>{pessoa.dados.dataDeNascimento}</td>
                  <td>{pessoa.dados.instituicaoDeEnsino}</td>
                  <td>{pessoa.dados.anoTurma}</td>
                  <td>{pessoa.dados.paisResponsaveis}</td>
                  <td>{pessoa.dados.endereco}</td>
                  <td>{pessoa.dados.contato}</td>
                  <td>{pessoa.dados.dataDeAtendimento}</td>
                  <td>
                    {pessoa.dados.modalidade === "outro"
                      ? pessoa.dados.outroTexto
                      : pessoa.dados.modalidade}
                  </td>
                  <td>{pessoa.dados.intervecao}</td>
                  <td>{pessoa.dados.acompanhamento}</td>
                  <td>{pessoa.dados.descricaoAcompanhamento}</td>
                  <td>
                    <div className="d-flex flex-column gap-1">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => editarPessoa(pessoa, index)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => excluirPessoa(index)}
                      >
                        Excluir
                      </button>
                      {pessoa.historico && pessoa.historico.length > 0 && (
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => abrirModalHistorico(pessoa)}
                        >
                          Ver Histórico
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal do histórico com animação */}
      {modalAberto && pessoaSelecionada && (
        <div
          className={`modal fade ${animarModal ? "show modal-fade-in show" : "modal-fade-in"}`}
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Histórico de versões - {pessoaSelecionada.dados.nome}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={fecharModal}
                />
              </div>
              <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {pessoaSelecionada.historico.length === 0 ? (
                  <p>Nenhuma versão anterior disponível.</p>
                ) : (
                  <>
                    <table className="table table-sm table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nome</th>
                          <th>Data de Nascimento</th>
                          <th>Instituição</th>
                          <th>Ano/Turma</th>
                          <th>Responsável</th>
                          <th>Endereço</th>
                          <th>Contato</th>
                          <th>Data Atendimento</th>
                          <th>Modalidade</th>
                          <th>Intervenção</th>
                          <th>Motivo</th>
                          <th>Descrição do Acompanhamento</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pessoaSelecionada.historico.map((versao, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{versao.nome}</td>
                            <td>{versao.dataDeNascimento}</td>
                            <td>{versao.instituicaoDeEnsino}</td>
                            <td>{versao.anoTurma}</td>
                            <td>{versao.paisResponsaveis}</td>
                            <td>{versao.endereco}</td>
                            <td>{versao.contato}</td>
                            <td>{versao.dataDeAtendimento}</td>
                            <td>{versao.modalidade === "outro" ? versao.outroTexto : versao.modalidade}</td>
                            <td>{versao.intervecao}</td>
                            <td>{versao.acompanhamento}</td>
                            <td>{versao.descricaoAcompanhamento}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="text-end">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => gerarPDFHistorico(pessoaSelecionada)}
                      >
                        Baixar PDF
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={fecharModal}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
