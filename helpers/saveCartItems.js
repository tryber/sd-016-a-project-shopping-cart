const saveCartItems = (productItem) => localStorage
  .setItem('cartItems', JSON.stringify(productItem));

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
