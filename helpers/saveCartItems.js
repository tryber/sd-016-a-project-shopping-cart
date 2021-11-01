const saveCartItems = (array) => {
  // seu código aqui
  localStorage.setItem('cartItems', JSON.stringify(array));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
