const getSavedCartItems = () => {
  const savedCartItems = localStorage.getItem('cartItems');
  cart.innerHTML = savedCartItems;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
