const getSavedCartItems = () => {
  const savedItem = localStorage.getItem('cartItems');
  console.log(savedItem);
  return JSON.parse(savedItem) || [];
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
