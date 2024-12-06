import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import LayoutAdmin from "./Pages/Admin/LayoutAdmin"
import Funcionario from "./Pages/Admin/Funcionario"
import Categoria from "./Pages/Admin/Categoria"
import Produto from "./Pages/Admin/Produto"
import Pedido from "./Pages/Admin/Pedido"
import Cardapio from "./Pages/Cardapio"

export default function App() {
  
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="funcionario" element={<Funcionario />} />
          <Route path="categoria" element={<Categoria />} />
          <Route path="produto" element={<Produto />} />
          <Route path="pedido" element={<Pedido />} />
        </Route>
      </Routes>
    </Router>
  )
}


