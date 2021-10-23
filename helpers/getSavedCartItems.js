const getSavedCartItems = () => {
  const store = localStorage.getItem('cartItems');
  return store;
};
 
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
