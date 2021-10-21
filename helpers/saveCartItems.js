const saveCartItems = (arg) => {
  localStorage.setItem('cartItems', arg);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
