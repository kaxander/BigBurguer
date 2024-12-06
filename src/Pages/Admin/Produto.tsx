import { useState } from "react";
import "./produto.css"

export default function Produto() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="p-10 flex flex-col gap-10">
      <div className="flex gap-10 w-full justify-center">
        <div className="flex w-[30%] px-4 py-3 rounded-md border-2 border-yellow-500 overflow-hidden font-[sans-serif]">
          <input
            type="email"
            placeholder="Procurar produto"
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
          onClick={toggleModal}
        >
          Criar produto
        </button>
      </div>

      <div className="font-[sans-serif] overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-white">Nome</th>
              <th className="p-4 text-left text-sm font-medium text-white">Descrição</th>
              <th className="p-4 text-left text-sm font-medium text-white">Imagem</th>
              <th className="p-4 text-left text-sm font-medium text-white">Preço</th>
              <th className="p-4 text-left text-sm font-medium text-white">Categoria</th>
              <th className="p-4 text-left text-sm font-medium text-white">Ações</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {/* Exemplo de Produto */}
            <tr className="even:bg-blue-50">
              <td className="p-4 text-sm text-black">X-burguer</td>
              <td className="p-4 text-sm text-black">bom demais</td>
              <td className="p-4 text-sm text-black">url</td>
              <td className="p-4 text-sm text-black">R$ 15,00</td>
              <td className="p-4 text-sm text-black">Lanches</td>
              <td className="p-4">Ações</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Adicionar Produto</h2>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nome"
                className="p-3 border border-gray-300 rounded-lg w-full"
              />
              <textarea
                placeholder="Descrição"
                className="p-3 border border-gray-300 rounded-lg w-full resize-none h-20"
              ></textarea>
              <input
                type="text"
                placeholder="Imagem (URL)"
                className="p-3 border border-gray-300 rounded-lg w-full"
              />
              <input
                type="number"
                placeholder="Preço"
                className="p-3 border border-gray-300 rounded-lg w-full appearance-none"
              />

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800"
                  onClick={toggleModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};