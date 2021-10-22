const getSavedCartItems = () => {
  const productsInCart = localStorage.getItem('cartItems');
  return productsInCart;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
