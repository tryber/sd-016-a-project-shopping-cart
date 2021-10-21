const saveCartItems = (ol) => {
  localStorage.setItem('cartItems', ol);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
