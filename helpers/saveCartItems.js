const saveCartItems = (products) => localStorage.setItem('cartItems', products);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
