function getSavedCartItems() {
  // seu código aqui
  return localStorage.getItem('cartItems');
}

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
