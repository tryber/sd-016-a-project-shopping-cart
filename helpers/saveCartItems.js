let elements = [];

const saveCartItems = (productId, order) => {
  if (order === 'save') {
    elements.push(productId);
    localStorage.setItem('cartItem', elements);
    console.log(localStorage);
  }
  if (order === 'del') {
    const arr = Object.values(localStorage)[0].split(',');
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] === productId) {
        arr.splice(i, 1);
      }
    }
    elements = arr;
    localStorage.setItem('cartItem', arr);
    console.log(localStorage);
  }  
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
