const getSavedCartItems = () => {
  // seu código aqui
  const cartItemsInfo = localStorage.getItem('cartItems');
  return cartItemsInfo;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
