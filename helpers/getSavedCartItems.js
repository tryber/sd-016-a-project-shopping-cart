const getSavedCartItems = () => {
  const isLocalStorage = localStorage.getItem('cartItems');
  return isLocalStorage;
};
// feito com a ajuda de colegas/monitoria

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
