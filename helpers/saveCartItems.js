// A função saveCartItems deve salvar os itens do carrinho de compras no localStorage, em uma chave denominada cartItems.

const saveCartItems = (element) => {
  // seu código aqui
  // // ajuda de eduardo miyasaki e fumagalli.
   localStorage.setItem('cartItems', element);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
