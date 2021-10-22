const saveCartItems = (items) => {
  localStorage.setItem('cartItems', items) // localStorage.setItem salva os items
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
