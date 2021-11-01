const getSavedCartItems = () => {
  const SavedCarts = localStorage.getItem('cartItems');
  return SavedCarts;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
