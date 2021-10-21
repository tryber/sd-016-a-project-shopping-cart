const getSavedCartItems = () => {
  // localStorage.getItem('cart__items')
  // JSON.parse(localStorage.getItem('user'));
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
