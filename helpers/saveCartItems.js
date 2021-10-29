const saveCartItems = (joe) => {
  // seu código aqui
  localStorage.setItem('cartItems', JSON.stringify(joe));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
