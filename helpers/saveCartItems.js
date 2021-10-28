const saveCartItems = (cartItems) => {
  // seu código aqui
  localStorage.setItem('cartItems', cartItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
