const saveCartItems = (allItems) => {
  // seu código aqui
  localStorage.setItem('cartItems', allItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}

// LocalStorage usage, done with help of Ricardo Carvalho
