const getSavedCartItems = () => {
  if (localStorage.getItem('lista') === null) return [];
  return localStorage.getItem('lista');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
