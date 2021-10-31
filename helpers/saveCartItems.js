const saveCartItems = (itens) => {
  localStorage.setItem('cartItems', itens);
};
// feito com a ajuda de colegas/monitoria

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
