import { useEffect, useState } from "react";

interface Categoria {
  id: number;
  nome: string;
}

export default function Categoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nome, setNome] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCategoria, setCurrentCategoria] = useState<Categoria | null>(null);

  // Função para buscar categorias
  const fetchCategorias = async () => {
    try {
      const response = await fetch("https://api-big-burguer.vercel.app/categorias");
      if (!response.ok) throw new Error("Erro ao carregar categorias.");
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Função para criar uma categoria
  const createCategoria = async () => {
    try {
      const response = await fetch("https://api-big-burguer.vercel.app/categoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });

      if (!response.ok) throw new Error("Erro ao criar categoria.");

      setNome(""); // Limpa o input
      fetchCategorias(); // Atualiza a lista
    } catch (error) {
      console.error(error);
    }
  };

  // Função para editar categoria
  const editCategoria = async () => {
    if (!currentCategoria) return;

    try {
      const response = await fetch(
        `https://api-big-burguer.vercel.app/categoria/${currentCategoria.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome: currentCategoria.nome }),
        }
      );

      if (!response.ok) throw new Error("Erro ao editar categoria.");

      setIsEditModalOpen(false); // Fecha o modal
      setCurrentCategoria(null);
      fetchCategorias(); // Atualiza a lista
    } catch (error) {
      console.error(error);
    }
  };

  // Função para deletar categoria
  const deleteCategoria = async (id: number) => {
  try {
    const response = await fetch(
      `https://api-big-burguer.vercel.app/categoria/delete/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao deletar categoria:", errorData.message || "Erro desconhecido");
      throw new Error("Erro ao deletar categoria.");
    }

    // Atualiza a lista de categorias
    fetchCategorias();
  } catch (error) {
    console.error("Erro ao tentar excluir a categoria:", error);
  }
};

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <div className="flex flex-col p-10 gap-10">
      {/* Input e botão de criar categoria */}
      <div className="w-full flex justify-center gap-10">
        <input
          type="text"
          placeholder="Criar categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-[30%] px-4 py-3 rounded-md border-2 border-yellow-500"
        />
        <button
          type="button"
          onClick={createCategoria}
          className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-yellow-500 hover:bg-yellow-600"
        >
          Criar categoria
        </button>
      </div>

      {/* Tabela de categorias */}
      <div className="font-[sans-serif] overflow-x-auto flex justify-center">
        <table className="w-1/2 bg-white">
          <thead className="bg-gray-800 whitespace-nowrap">
            <tr>
              <th className="p-4 text-start text-sm font-medium text-white">Nome</th>
              <th className="p-4 text-sm font-medium text-white text-end">Ações</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {categorias.map((categoria) => (
              <tr key={categoria.id} className="even:bg-blue-50">
                <td className="p-4 text-sm text-black">{categoria.nome}</td>
                <td className="p-4 text-end">
                  <button
                    className="mr-4"
                    title="Edit"
                    onClick={() => {
                      setCurrentCategoria(categoria);
                      setIsEditModalOpen(true);
                    }}
                  >
                    edit
                  </button>
                  <button
                    className="mr-4"
                    title="Delete"
                    onClick={() => deleteCategoria(categoria.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para editar categoria */}
      {isEditModalOpen && currentCategoria && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Editar Categoria</h2>
            <input
              type="text"
              value={currentCategoria.nome}
              onChange={(e) =>
                setCurrentCategoria({ ...currentCategoria, nome: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={editCategoria}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
