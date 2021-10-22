const getSavedCartItems = () => localStorage.getItem('cartItems');
// localStorage.getItem recupera o item salvo

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
