const saveCartItems = (allitems) => {
 localStorage.setItem('cartItems', allitems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
