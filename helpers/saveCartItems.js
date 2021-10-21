let elements = [];

const delCartItems = (productId) => {
  const arr = Object.values(localStorage)[0].split(',');
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] === productId) {
        arr.splice(i, 1);
      }
    }
    elements = arr;
    localStorage.setItem('cartItem', arr);
};

const saveCartItems = (productId) => {
  elements.push(productId);
  localStorage.setItem('cartItem', elements);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
  module.exports = delCartItems;
}
