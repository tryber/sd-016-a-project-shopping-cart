const saveCartItems = (cartOl) => {
  // seu código aqui
  localStorage.setItem('cartItems', cartOl);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
