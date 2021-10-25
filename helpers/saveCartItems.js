const saveCartItems = (itenscart) => localStorage.setItem('cartItems', itenscart);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
