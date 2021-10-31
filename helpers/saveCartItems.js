// Realizado com a ajuda da Criz Souza o/

const saveCartItems = (itens) => {
  localStorage.setItem('cartItems', itens);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
