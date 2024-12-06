import { useEffect, useState } from "react";

interface Funcionario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

export default function Funcionario() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Funcionario>({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
  });
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  // Função para carregar todos os funcionários
  const fetchFuncionarios = async () => {
    try {
      const response = await fetch("https://api-big-burguer.vercel.app/funcionarios");
      if (!response.ok) {
        throw new Error(`Erro ao carregar funcionários: ${response.statusText}`);
      }
      const data = await response.json();
      setFuncionarios(data); // Atualiza o estado com a lista de funcionários
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFuncionarios(); // Chama a função ao carregar o componente
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCreateFuncionario = async () => {
    try {
      const response = await fetch("https://api-big-burguer.vercel.app/funcionario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }

      const data = await response.json();

      setFuncionarios((prev) => [...prev, data.funcionario]);
      setFormData({ nome: "", email: "", senha: "", telefone: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar funcionário:", error);
    }
  };

  return (
    <div className="p-10 flex flex-col gap-10">
      {/* Header e Botão Criar Funcionário */}
      <div className="flex gap-10 w-full justify-center">
        <div className="flex w-[30%] px-4 py-3 rounded-md border-2 border-yellow-500 overflow-hidden font-[sans-serif]">
          <input
            type="email"
            placeholder="Procurar funcionário"
            className="w-full outline-none bg-transparent text-gray-600 text-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="16px"
            className="fill-gray-600"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
        </div>
        <button
          type="button"
          className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-yellow-500 hover:bg-yellow-600"
          onClick={() => setIsModalOpen(true)}
        >
          Criar Funcionário
        </button>
      </div>

      {/* Tabela */}
      <div className="font-[sans-serif] overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-white">Nome</th>
              <th className="p-4 text-left text-sm font-medium text-white">Email</th>
              <th className="p-4 text-left text-sm font-medium text-white">Senha</th>
              <th className="p-4 text-left text-sm font-medium text-white">Telefone</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {funcionarios.map((funcionario) => (
              <tr key={funcionario.id} className="even:bg-blue-50">
                <td className="p-4 text-sm text-black">{funcionario.nome}</td>
                <td className="p-4 text-sm text-black">{funcionario.email}</td>
                <td className="p-4 text-sm text-black">{funcionario.senha}</td>
                <td className="p-4 text-sm text-black">{funcionario.telefone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Criar Funcionário</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="nome" className="block text-sm font-medium mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="senha" className="block text-sm font-medium mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="telefone" className="block text-sm font-medium mb-2">
                  Telefone
                </label>
                <input
                  type="text"
                  id="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                  onClick={handleCreateFuncionario}
                >
                  Criar funcionário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
