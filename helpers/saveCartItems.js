// requisito feito com ajuda do Brunão e da Cris;

const saveCartItems = (allItems) => {
     localStorage.setItem('cartItems', allItems);
 };

 if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
 }
