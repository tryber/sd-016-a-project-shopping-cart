const getSavedCartItems = () => localStorage.getItem('items');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
