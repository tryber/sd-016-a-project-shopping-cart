const saveCartItems = (item) => {
  localStorage.setItem('cartItems', item);
  if (!localStorage.getItem('cartItems')) localStorage.clear();
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
