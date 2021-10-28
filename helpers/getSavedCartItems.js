const getSavedCartItems = () => {
  const cartItens = localStorage.getItem('cartItems');
  return cartItens;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
