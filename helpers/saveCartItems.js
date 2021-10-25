const saveCartItems = (items) => {
  localStorage.setItem('cartItems', items);
  return 1;
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
