const saveCartItems = (key, items) => {
  localStorage.setItem(key, items);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
