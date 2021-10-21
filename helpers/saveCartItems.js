const saveCartItems = (productId, order) => {
  if (order === 'save') {
    localStorage.setItem(`${productId}`, productId); 
  }
  if (order === 'remove') {
    localStorage.removeItem(`${productId}`);
  }     
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
