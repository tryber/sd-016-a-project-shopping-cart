// Participei de um grupo de estudos encabeçado pelo Joel, pelo Humberto e pelo Lucas Monteiro no dia 22/10
const getSavedCartItems = () => localStorage.getItem('cartItems');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
