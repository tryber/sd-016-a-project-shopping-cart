const saveCartItems = (product) => {
  // seu código aqui
  // split
  localStorage.setItem('cartItems', JSON.stringify(product));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
