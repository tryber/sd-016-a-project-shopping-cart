const getSavedCartItems = () => {
  const cartItems = localStorage.getItem('cartItem');
  return cartItems;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
