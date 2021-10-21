const getSavedCartItems = () => {
  const itemList = localStorage.getItem('cartItems');
  return itemList;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
