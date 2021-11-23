const getSavedCartItems = () => {
  const cartItensSaved = localStorage.getItem('cartItem');
  return cartItensSaved;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
