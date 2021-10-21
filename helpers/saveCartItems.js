const saveCartItems = (element) => {
  localStorage.setItem('cartItem', element);  
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
