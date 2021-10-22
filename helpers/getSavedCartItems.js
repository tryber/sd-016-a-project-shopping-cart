const getSavedCartItems = () => {
  const items = localStorage.getItem('cart');
  return items;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
