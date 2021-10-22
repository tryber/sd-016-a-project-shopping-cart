const saveCartItems = (cartItemsList) => {
  localStorage.setItem('cartItems', cartItemsList);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
