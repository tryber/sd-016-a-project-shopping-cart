const saveCartItems = (listItens) => {
  localStorage.setItem('cartItems', listItens);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
