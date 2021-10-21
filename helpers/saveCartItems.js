const saveCartItems = (item) => {
  // seu código aqui
  storageCartArray.push(item);
  localStorage.setItem('cartItems', JSON.stringify(storageCartArray))
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
