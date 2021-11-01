const saveCartItems = (allitem) => {
 localStorage.setItem('cartItems', allitem);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
