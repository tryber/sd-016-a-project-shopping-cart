const getSavedCartItems = () => 
  // seu código aqui
  JSON.parse(localStorage.getItem('cartItems')) || [];
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
