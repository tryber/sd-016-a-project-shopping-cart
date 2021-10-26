const saveCartItems = () => {
  localStorage.setItem('cartItems', items); 
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
