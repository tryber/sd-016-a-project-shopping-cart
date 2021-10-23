const saveCartItems = (stringItems) => {
  localStorage.setItem('cartItems', stringItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
