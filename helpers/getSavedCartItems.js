const getSavedCartItems = () => {
  const items = localStorage.getItem('cartItems');
  return items;
};
// .getItem recupera o item salvo

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
