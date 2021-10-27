const saveCartItems = (cartItems) => {
  window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
