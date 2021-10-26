const saveCartItems = (args) => localStorage.setItem('cartItems', args);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
