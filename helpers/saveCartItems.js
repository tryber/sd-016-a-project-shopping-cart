// Agradecimento especial ao Carlos(T16) e Fumagalli(T16) que me ajudaram a chegar a uma melhor conclusão.
const saveCartItems = (save) => localStorage.setItem('cartItems', save);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
