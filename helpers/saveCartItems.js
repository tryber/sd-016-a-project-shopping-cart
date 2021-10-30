const saveCartItems = ({ innerHTML }) => 
  localStorage.setItem('cartItems', JSON.stringify(innerHTML));

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
