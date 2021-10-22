const saveCartItems = (cartItems) => {
  localStorage.setItem('cartItems', cartItems.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
