const getSavedCartItems = () => {
  const cartItemsInfo = localStorage.getItem('cart-item');

  return cartItemsInfo;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
