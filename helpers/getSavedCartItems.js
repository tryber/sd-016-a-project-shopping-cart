const getSavedCartItems = () => {
  // seu código aqui
  const getLocal = localStorage.getItem('Produto');
  return getLocal;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
