const saveCartItems = (dataCartItems) => {
  localStorage.setItem('cartItems', dataCartItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
