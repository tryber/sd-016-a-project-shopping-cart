const requestApi = (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  return fetch(url).then((response) => response.json())
  .then((datas) => datas);
};

function getId(productsList) {
  if (productsList[productsList.length - 1] === undefined) {
    return 0;
  }

  return productsList[productsList.length - 1]
  .innerText.split('SKU: ')[1].split(' |')[0];
}

let array = [];

const saveCartItems = (element) => {
  const productsList = document.getElementsByClassName('cart__item');
  const productId = getId(productsList);

  if (element !== undefined) {
    const removeId = element.innerText.split('SKU: ')[1].split(' |')[0];
    console.log(removeId);
    const filteredArray = array.filter((object) => object.SKU !== removeId);
    localStorage.setItem('cart-item', JSON.stringify(filteredArray));
    array = filteredArray;
    return 0;
  }

  requestApi(productId).then((response) => {
    const { id: SKU, title: name, price: salePrice } = response;
    array.push({ SKU, name, salePrice });
    localStorage.setItem('cart-item', JSON.stringify(array));
  });
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}