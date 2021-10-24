const getSavedCartItems = () => {
  const rec = window.localStorage.getItem('cartItems');
  const obj = JSON.parse(rec);
  return obj;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
