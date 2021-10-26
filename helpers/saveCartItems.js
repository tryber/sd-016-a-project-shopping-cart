const saveCartItems = (olCartItems) => {
  localStorage.setItem('cartItems', olCartItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
