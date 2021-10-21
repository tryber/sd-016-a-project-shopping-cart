const saveCartItems = (element) => localStorage.setItem('items', element);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
