const saveCartItems = (productItem) => localStorage
  .setItem('cartItems', productItem);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
