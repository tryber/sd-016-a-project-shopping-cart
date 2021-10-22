const saveCartItems = (product) => {
  // A função saveCartItems deve salvar os itens do carrinho de compras no localStorage, em uma chave denominada cartItems. Todas as adições e remoções devem ser abordadas para que a lista esteja sempre atualizada.
 localStorage.setItem('cartItems', product);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
