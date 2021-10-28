const saveCartItems = (value) => {
// setItem, getItem, removeItem
  localStorage.setItem('cartItems', value);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
