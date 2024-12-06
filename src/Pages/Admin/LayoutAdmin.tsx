import { Outlet, NavLink } from 'react-router-dom';

export default function AdminLayout() {

  return (
    <div className="flex h-screen">
      {/* Sidebar fixo */}
      <aside className="w-64 bg-white border-r border-gray-300 flex flex-col justify-between">
        {/* Logo */}
        <div>
          <img src="/src/assets/logo.jpg" alt="Logo" className="p-10" />
          <nav className="flex flex-col gap-6 p-4">
            <NavLink
              to="/admin/funcionario"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 font-bold bg-yellow-100 text-center rounded-lg p-2"
                  : "text-gray-700 hover:text-yellow-500 text-center"
              }
            >
              Funcionários
            </NavLink>
            <NavLink
              to="/admin/categoria"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 font-bold bg-yellow-100 text-center rounded-lg p-2"
                  : "text-gray-700 hover:text-yellow-500 text-center"
              }
            >
              Categorias
            </NavLink>
            <NavLink
              to="/admin/produto"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 font-bold bg-yellow-100 text-center rounded-lg p-2"
                  : "text-gray-700 hover:text-yellow-500 text-center"
              }
            >
              Produtos
            </NavLink>
            <NavLink
              to="/admin/pedido"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 font-bold bg-yellow-100 text-center rounded-lg p-2"
                  : "text-gray-700 hover:text-yellow-500 text-center"
              }
            >
              Pedidos
            </NavLink>
          </nav>
        </div>

        {/* Botão de Logout */}
        <div className="p-4">
          <button
            className="w-full text-white bg-yellow-500 hover:bg-yellow-600 text-center py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Área de Conteúdo */}
      <main className="flex-1 bg-gray-50">
        <div className="p-8">
          <Outlet /> {/* Renderiza o conteúdo das rotas */}
        </div>
      </main>
    </div>
  );
}
