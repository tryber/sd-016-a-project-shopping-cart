const getSavedCartItems = () => {
 const itens = localStorage.getItem('cartItem');
 return itens;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
