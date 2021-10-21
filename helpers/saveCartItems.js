const saveCartItems = (i, value) => {
  localStorage.setItem(i, value);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
