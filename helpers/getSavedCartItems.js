const getSavedCartItems = () => {
  const cartItemsInfo = JSON.parse(localStorage.getItem('cart-item'));
  return cartItemsInfo;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
