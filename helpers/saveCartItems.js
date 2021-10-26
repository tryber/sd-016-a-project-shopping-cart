const saveCartItems = (cartItems) => localStorage.setItem('cartItem', cartItems);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
