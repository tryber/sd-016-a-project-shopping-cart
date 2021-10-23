const getSavedCartItems = () => localStorage.getItem('cartItems');
// .getItem recupera o item salvo

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
