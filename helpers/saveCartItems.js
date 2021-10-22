const saveCartItems = (items) => {
    localStorage.setItem('cartItems', items);
    console.log('salvou');
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
