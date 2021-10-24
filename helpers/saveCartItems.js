const saveCartItems = (stringItems) => {
  localStorage.setItem('cartItems', stringItems);
  // console.log('Salvando no Storage stringItems ' + stringItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
