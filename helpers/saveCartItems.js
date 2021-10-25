const saveCartItems = (items) => {
  // seu código aqui
  localStorage.setItem('cartItems', items);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
