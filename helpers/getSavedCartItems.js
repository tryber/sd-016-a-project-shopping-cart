const getSavedCartItems = () => localStorage.getItem('cartItens');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
