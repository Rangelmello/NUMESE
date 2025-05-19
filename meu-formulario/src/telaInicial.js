import "bootstrap/dist/css/bootstrap.min.css";

export default function TelaInicial({ onCadastro, onRelatorios, onPessoas }) {
  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">Sistema de Acompanhamento NUMESE</h1>
        <p className="lead text-secondary">Bem-vindo! Escolha uma das opções abaixo para começar.</p>
      </div>

      <div className="d-grid gap-4 col-12 col-sm-8 col-md-6">
        <button className="btn btn-primary btn-lg shadow" onClick={onCadastro}>
          Cadastro
        </button>
        <button className="btn btn-outline-primary btn-lg shadow" onClick={onRelatorios}>
          Relatórios
        </button>
        <button className="btn btn-outline-secondary btn-lg shadow" onClick={onPessoas}>
          Pessoas Cadastradas
        </button>
      </div>
    </div>
  );
}
