const saveCartItems = (saveCart) => {
  localStorage.setItem('cartItems', saveCart.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
