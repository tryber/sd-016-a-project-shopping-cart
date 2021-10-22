const saveCartItems = (value) => {
  // seu código aqui
  localStorage.setItem('cartItems', value);
};
if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
