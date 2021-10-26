// Agradecimento especial ao Carlos(T16) e Fumagalli(T16) que me ajudaram a chegar a uma melhor conclusão.
const getSavedCartItems = () => localStorage.getItem('cartItems');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
