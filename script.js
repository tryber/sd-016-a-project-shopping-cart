// const { fetchProducts } = require("./helpers/fetchProducts");
// const { fetchItem } = require("./helpers/fetchItem");

const cartItems = document.querySelector('.cart__items');

let listStorage = [];

const renderTotalPrice = (price) => {
  const totalPriceElement = document.querySelector('.total-price');
  totalPriceElement.innerHTML = price;
};

const updateSumTotalPrice = (productsObj) => {
  const salePriceValues = productsObj.map((product) => product.salePrice);
  totalPrice = salePriceValues.reduce((acc, value) => acc + value, 0);
  renderTotalPrice(totalPrice);
};

const setStorageListProducts = (objProduct) => {
  listStorage.push(objProduct);
  localStorage.setItem('listProducts', JSON.stringify(listStorage));
  updateSumTotalPrice(listStorage);
};

const listStorageUpdate = () => {
  const listOnStorage = JSON.parse(localStorage.getItem('listProducts'));
  if (listOnStorage === null) {
    localStorage.setItem('listProducts', '[]');
    listStorage = [];
    updateSumTotalPrice(listStorage);
  } listStorage = listOnStorage;
  updateSumTotalPrice(listStorage);
};

const listStorageOnload = () => {
  const listOnStorage = JSON.parse(localStorage.getItem('listProducts'));
  if (listOnStorage !== null) {
    updateSumTotalPrice(listOnStorage);
  }
};

const removeItem = (sku) => {
  const indexItemToRemove = listStorage.findIndex((item) => item.sku === sku);
  listStorage.splice(indexItemToRemove, 1);
  localStorage.setItem('listProducts', JSON.stringify(listStorage));
  updateSumTotalPrice(listStorage);
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function cartItemClickListener(event) {
  if (event.target.className === 'cart__item') {
    event.target.remove();
    listStorageUpdate();
  }
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const createCartItemElementFromFetchItem = async (products) => {
  const data = await fetchItem(products);

  const obj = {
    sku: data.id,
    name: data.title,
    salePrice: data.price,
  };

  const proudctItem = createCartItemElement(obj);
  cartItems.appendChild(proudctItem);
  const text = cartItems.innerHTML;
  saveCartItems(text);
  setStorageListProducts(obj);
  listStorageUpdate();
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function productClickListener(event) {
  const id = getSkuFromProductItem(event.target.parentNode);
  createCartItemElementFromFetchItem(id);
}

const itemAddButtonAction = () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) =>
    button.addEventListener('click', productClickListener));
};

const createProductItemElementFromFetchProduct = async (products) => {
  const sectionItems = document.querySelector('.items');
  const data = await fetchProducts(products);
  data.results.forEach(({ id, title, thumbnail }) => {
    const obj = {
      sku: id,
      name: title,
      image: thumbnail,
    };
    const proudctItem = createProductItemElement(obj);
    sectionItems.appendChild(proudctItem);
  });
  itemAddButtonAction();
};

const getSavedCartItemsOnload = () => {
  const getLocalStorage = JSON.parse(getSavedCartItems());
  cartItems.innerHTML = getLocalStorage;
  cartItems.addEventListener('click', cartItemClickListener);
  cartItems.addEventListener('click', () => {
    const text = cartItems.innerHTML;
    localStorage.setItem('cartItems', JSON.stringify(text));
  });
  cartItems.addEventListener('click', (element) => {
    if (element.target.className === 'cart__item') {
      const sku = element.target.innerText.split(' ')[1];
      removeItem(sku);
    }
  });
};

window.onload = () => {
  createProductItemElementFromFetchProduct('computador');
  getSavedCartItemsOnload();
  listStorageOnload();
};
