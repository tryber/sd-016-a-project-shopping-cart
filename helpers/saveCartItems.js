const saveCartItems = (infos) => localStorage.setItem('cartItems', infos);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
