import { useState, useEffect } from "react";
import { Pedido } from "../../types/Pedido";
import { formatCurrency } from "../../utils/formatCurrency";

// Modal para exibir os detalhes do pedido
const PedidoModal = ({ visivel, pedido, onClose }: { visivel: boolean; pedido: Pedido | null; onClose: () => void }) => {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!visivel || !pedido) {
    return null;
  }

  const total = pedido.produtos.reduce((total, { produto, quantidade }) => total + produto.preco * quantidade, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg p-8 shadow-xl w-[480px]">
        <header className="flex justify-between items-center">
          <strong className="text-2xl">Mesa {pedido.mesa}</strong>
          <button type="button" onClick={onClose} className="focus:outline-none">
            x
          </button>
        </header>

        <div className="mt-8">
          <small className="text-sm text-gray-500">Status do Pedido</small>
          <div className="mt-2 flex items-center gap-2">
            <span>{pedido.status === "WAITING" && "🕒"}</span>
            <span>{pedido.status === "IN_PRODUCTION" && "🧑‍🍳"}</span>
            <span>{pedido.status === "DONE" && "✅"}</span>
            <strong>{pedido.status === "WAITING" && "Fila de espera"}</strong>
            <strong>{pedido.status === "IN_PRODUCTION" && "Em preparação"}</strong>
            <strong>{pedido.status === "DONE" && "Pronto!"}</strong>
          </div>
        </div>

        <div className="mt-8">
          <strong className="text-sm font-medium text-gray-500 opacity-60">Itens</strong>
          <div className="mt-4">
            {pedido.produtos.map(({ _id, produto, quantidade }) => (
              <div key={_id} className="flex items-center gap-4 mb-4">
                <img src={`http://localhost:3001/uploads/${produto.imagemPath}`} alt={produto.nome} width="56" height="28.51" className="rounded-lg" />
                <span className="text-sm text-gray-600">{quantidade}x</span>
                <div>
                  <strong className="block">{produto.nome}</strong>
                  <span className="text-sm text-gray-600">{formatCurrency(produto.preco)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <span className="font-medium text-sm text-gray-500 opacity-60">Total</span>
            <strong className="text-xl">{formatCurrency(total)}</strong>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <button className="bg-gray-800 text-white rounded-full py-3 px-6 flex items-center justify-center gap-2">
            <span>⏳</span>
            <strong>Iniciar preparação</strong>
          </button>

          <button className="bg-transparent text-red-600 font-bold py-3 px-6 border border-red-600 rounded-full">
            Cancelar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente que gerencia o board de pedidos
const PainelDePedidos = ({ icone, titulo, pedidos }: { icone: string; titulo: string; pedidos: Pedido[] }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<null | Pedido>(null);

  function handleOpenModal(pedido: Pedido) {
    setIsModalVisible(true);
    setPedidoSelecionado(pedido);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setPedidoSelecionado(null);
  }

  return (
    <div className="flex-1 p-4 border border-gray-200 rounded-lg flex flex-col items-center justify-center">
      <PedidoModal visivel={isModalVisible} pedido={pedidoSelecionado} onClose={handleCloseModal} />

      <header className="flex items-center gap-2 text-sm font-medium">
        <span>{icone}</span>
        <strong>{titulo}</strong>
        <span>({pedidos.length})</span>
      </header>

      {pedidos.length > 0 && (
        <div className="mt-6 w-full">
          {pedidos.map((pedido) => (
            <button
              key={pedido._id}
              type="button"
              onClick={() => handleOpenModal(pedido)}
              className="w-full bg-white border border-gray-200 rounded-lg py-6 flex flex-col items-center justify-center gap-2 mb-6"
            >
              <strong className="font-semibold">{pedido.mesa}</strong>
              <span className="text-sm text-gray-500">{pedido.produtos.length} itens</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Componente principal para gerenciar os pedidos
const Pedidos = () => {
  const pedidos: Pedido[] = [
    {
      _id: "6661f5d6dddcfa5acac641e3",
      mesa: "123",
      status: "IN_PRODUCTION",
      produtos: [
        {
          produto: {
            nome: "Pizza 4 queijos",
            imagemPath: "1717692947889-quatro-queijos.png",
            preco: 40,
          },
          quantidade: 3,
          _id: "6661f5d6dddcfa5acac641e4",
        },
        {
          produto: {
            nome: "Coca cola",
            imagemPath: "1717694237621-coca-cola.png",
            preco: 7,
          },
          quantidade: 2,
          _id: "6661f5d6dddcfa5acac641e5",
        },
      ],
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto mt-10 flex gap-8 p-6">
      <PainelDePedidos icone="🕐" titulo="Fila de espera" pedidos={pedidos} />
      <PainelDePedidos icone="🧑‍🍳" titulo="Em preparação" pedidos={[]} />
      <PainelDePedidos icone="✅" titulo="Pronto!" pedidos={[]} />
    </div>
  );
};

export default Pedidos;
