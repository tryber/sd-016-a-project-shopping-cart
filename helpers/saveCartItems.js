const saveCartItems = (product) => {
  // seu código aqui
  // split
  localStorage.setItem('cartItems', product);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
