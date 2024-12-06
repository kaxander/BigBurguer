export interface Pedido {
  _id: string;
  mesa: string; // Renomeado de "table" para "mesa"
  status: "WAITING" | "IN_PRODUCTION" | "DONE";
  produtos: { // Renomeado de "products" para "produtos"
    _id: string;
    quantidade: number; // Renomeado de "quantity" para "quantidade"
    produto: { // Renomeado de "product" para "produto"
      nome: string; // Renomeado de "name" para "nome"
      imagemPath: string; // Renomeado de "imagePath" para "imagemPath"
      preco: number; // Renomeado de "price" para "preco"
    };
  }[];
}
