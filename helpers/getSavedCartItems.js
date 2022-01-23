const getSavedCartItems = () => {
  const savedCart = localStorage.getItem('cartItems');
  return savedCart;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
