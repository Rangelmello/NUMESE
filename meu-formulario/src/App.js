import { useState, useEffect } from "react";
import TelaInicial from "./telaInicial";
import Formulario from "./formulario";
import PessoasCadastradas from "./PessoasCadastradas";
import Relatorio from "./relatorio";
import "./App.css";

export default function App() {
  const [tela, setTela] = useState("inicial");
  const [pessoas, setPessoas] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const armazenadas = localStorage.getItem("pessoasCadastradas");
    if (armazenadas) {
      const carregadas = JSON.parse(armazenadas);
      const formatadas = carregadas.map((pessoa) =>
        pessoa.dados
          ? pessoa // já no novo formato
          : { dados: pessoa, historico: [] } // converte antigo para novo
      );
      setPessoas(formatadas);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pessoasCadastradas", JSON.stringify(pessoas));
  }, [pessoas]);

  const adicionarPessoa = (dados) => {
    const novaVersao = {
      ...dados,
      dataHoraCadastro: new Date().toISOString(),
    };

    if (editIndex !== null) {
      setPessoas((prevPessoas) => {
        const novasPessoas = [...prevPessoas];
        const pessoaAtual = novasPessoas[editIndex];

        const novaPessoa = {
          dados: novaVersao,
          historico: [...(pessoaAtual.historico || []), pessoaAtual.dados], // adiciona versão antiga no histórico
        };

        novasPessoas[editIndex] = novaPessoa;
        return novasPessoas;
      });
      setEditIndex(null);
    } else {
      setPessoas((prevPessoas) => [
        ...prevPessoas,
        {
          dados: novaVersao,
          historico: [], // histórico vazio para pessoa nova
        },
      ]);
    }
  };

  const editarPessoa = (pessoa, index) => {
    setFormData(pessoa.dados);
    setEditIndex(index);
    setTela("formulario");
  };

  const excluirPessoa = (index) => {
    const novasPessoas = [...pessoas];
    novasPessoas.splice(index, 1);
    setPessoas(novasPessoas);
  };

  const voltarParaInicial = () => {
    setTela("inicial");
    setEditIndex(null);
    setFormData(null);
  };

  return (
    <>
      {tela === "inicial" && (
        <TelaInicial
          onCadastro={() => {
            setFormData(null);
            setTela("formulario");
          }}
          onPessoas={() => setTela("pessoas")}
          onRelatorios={() => setTela("relatorios")} 
        />
      )}

      {tela === "formulario" && (
        <Formulario
          onSalvar={(dados) => {
            adicionarPessoa(dados);
            setTela("pessoas");
          }}
          voltar={voltarParaInicial}
          dadosIniciais={formData}
        />
      )}

      {tela === "pessoas" && (
        <PessoasCadastradas
          pessoas={pessoas}
          voltar={voltarParaInicial}
          editarPessoa={editarPessoa}
          excluirPessoa={excluirPessoa}
        />
      )}

      {tela === "relatorios" && (
        <Relatorio pessoas={pessoas} voltar={voltarParaInicial} />
      )}
    </>
  );
}
