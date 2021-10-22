const saveCartItems = (text) => {
  localStorage.setItem('cartItems', JSON.stringify(text));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
