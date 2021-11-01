const saveCartItems = (innerHTML) => 
  localStorage.setItem('cartItems', innerHTML);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
