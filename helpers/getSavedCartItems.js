const getSavedCartItems = () => {
  const itemsList = localStorage.getItem('cartItems');
  return itemsList;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
