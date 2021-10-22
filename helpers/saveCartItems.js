const saveCartItems = (items) => {
  localStorage.setItem('cart', items);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
