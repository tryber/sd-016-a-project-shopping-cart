// Participei de um grupo de estudos encabeçado pelo Joel, pelo Humberto e pelo Lucas Monteiro no dia 22/10
const getSavedCartItems = (items) => localStorage.getItem('cartItems', items);

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
