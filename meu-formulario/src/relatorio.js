import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format } from "date-fns";

export default function Relatorio({ pessoas, voltar }) {
  const [mesSelecionado, setMesSelecionado] = useState("");

  const extrairMesAno = (dataISO) => {
    const data = new Date(dataISO);
    return format(data, "yyyy-MM");
  };

  const agruparPorCampo = (campo) => {
    const contagem = {};

    pessoas.forEach((pessoa) => {
      const registros = [pessoa.dados, ...(pessoa.historico || [])];

      registros.forEach((registro) => {
        const mesAno = extrairMesAno(registro.dataDeAtendimento);
        if (!mesSelecionado || mesAno === mesSelecionado) {
          const chave = registro[campo] === "outro" ? registro.outroTexto : registro[campo];
          contagem[chave] = (contagem[chave] || 0) + 1;
        }
      });
    });

    return Object.entries(contagem).map(([nome, total]) => ({ nome, total }));
  };

  const graficos = [
    { titulo: "Modalidade de Atendimento", campo: "modalidade" },
    { titulo: "Instituição de Ensino", campo: "instituicaoDeEnsino" },
    { titulo: "Área de Intervenção", campo: "intervecao" },
    { titulo: "Motivo do Acompanhamento", campo: "acompanhamento" },
  ];

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Relatórios por Campo</h2>

      <div className="mb-4 text-center">
        <label className="me-2 fw-bold">Filtrar por mês:</label>
        <input
          type="month"
          value={mesSelecionado}
          onChange={(e) => setMesSelecionado(e.target.value)}
        />
      </div>

      <div className="d-grid gap-4">
        {graficos.map(({ titulo, campo }, idx) => (
          <div key={idx} className="card shadow-sm p-3">
            <h5 className="text-center mb-3">{titulo}</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={agruparPorCampo(campo)} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis dataKey="nome" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" name="Total" barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={voltar}>
          Voltar
        </button>
      </div>
    </div>
  );
}
