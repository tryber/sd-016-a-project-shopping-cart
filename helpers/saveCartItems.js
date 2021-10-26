const saveCartItems = (array) => {
  // seu código aqui
  localStorage.setItem('cartItems', array);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
