const saveCartItems = (item) => {
  window.localStorage.setItem('cartItems', JSON.stringify(item));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
