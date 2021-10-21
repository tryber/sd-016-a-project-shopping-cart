const getSavedCartItems = () => {
  const result = localStorage.getItem('cartItems');
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
