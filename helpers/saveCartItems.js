const saveCartItems = (inner) => {
  localStorage.setItem('cartItems', inner);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
