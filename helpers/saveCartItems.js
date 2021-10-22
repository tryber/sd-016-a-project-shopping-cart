const saveCartItems = (listaHTML) => localStorage.setItem('cartItems', listaHTML);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
