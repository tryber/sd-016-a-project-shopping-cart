const saveCartItems = (item) => {
    localStorage.setItem('cartItem', item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
