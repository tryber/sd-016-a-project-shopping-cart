const saveCartItems = (i) => {
  localStorage.setItem('cartItems', i);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
