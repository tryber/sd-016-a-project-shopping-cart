const saveCartItems = (key, value) => {
  localStorage.setItem(key, value);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
