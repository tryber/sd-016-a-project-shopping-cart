const saveCartItems = (cartItemsList) => {
  localStorage.clear();
  localStorage.setItem('cartItems', cartItemsList);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
