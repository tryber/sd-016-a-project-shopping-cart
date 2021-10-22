const saveCartItems = (items) => localStorage.setItem('cartItens', items);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
