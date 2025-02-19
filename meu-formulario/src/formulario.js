import { useState } from "react";

export default function Formulario() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    idade: "",
    instituicaoDeEnsino:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2)); // Exibe o JSON formatado
  };

  return (
    <div className="App-link">
      <h2 className="">Formulário</h2>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label className="">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className=""
          />
        </div>
        <div className="">
          <label className="">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className=""
          />
        </div>
        <div className="">
          <label className="">Idade</label>
          <input
            type="number"
            name="idade"
            value={formData.idade}
            onChange={handleChange}
            className=""
          />
        </div>
        <div className="">
          <label className="">Instituição de Ensino</label>
          <input
            type="text"
            name="instituicaoDeEnsino"
            value={formData.instituicaoDeEnsino}
            onChange={handleChange}
            className=""
          />
        </div>
        <button type="submit" className="">
          Enviar
        </button>
      </form>
    </div>
  );
}
