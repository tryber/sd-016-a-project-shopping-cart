const saveCartItems = (items) => localStorage.setItem('cartItems', items);
// .setItem salva os items

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
