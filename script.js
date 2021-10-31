const cartSection = document.querySelector('.cart__items');
const total = document.querySelector('.total-price');
let sum = 0;
let arrayToLocalStorage = [];

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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function sumPriceFromLocalStorage() {
  const storage = JSON.parse(getSavedCartItems());
  if (storage !== null) {
    sum = 0;
    storage.forEach((item) => {
      sum += item.salePrice;
    });
    total.innerText = sum;
  }
}

function renewLocalStorageData(sku) {
  // Camila Ranniele e Fernando Mós
  arrayToLocalStorage = [];
  const storage = JSON.parse(getSavedCartItems());
    if (storage !== null) {
    const storageProduct = storage.find((product) => product.sku === sku);
    const indexOfProduct = storage.indexOf(storageProduct);
    storage.splice(indexOfProduct, 1);
    saveCartItems(JSON.stringify(storage));
    sumPriceFromLocalStorage();
  }
}

function cartItemClickListener(event) {
  const del = event;
  const value = del.target.innerText;
  const sku = value.slice(5, 18);
  renewLocalStorageData(sku);
  return del.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function loading() {
  const items = document.querySelector('.items');
  const loadingTag = document.createElement('span');
  loadingTag.className = 'loading';
  loadingTag.innerText = 'carregando...';
  items.appendChild(loadingTag);
}

function removeLoading() {
  const loadingTag = document.querySelector('.loading');
  loadingTag.remove();
}

const products = fetchProducts('computador').then((product) => product
  .results.reduce((acc, item) => {
  acc.push({
    sku: item.id,
    name: item.title,
    image: item.thumbnail,
  });
  return acc;
}, []));

function getFetchItem(sku) {
  return fetchItem(sku)
  .then((item) => {
    const { title: name, price: salePrice } = item;
    return { sku, name, salePrice };
  });
}

async function productItemToCart() {
  loading();
  await fetchProducts('computador')
    .then((data) => {
      data.results.forEach((result) => {
      const { id: sku, title: name, thumbnail: image } = result;
      cartSection.appendChild(createProductItemElement({ sku, name, image }));
    });
  });
  removeLoading();
}

async function appendElement(elementClass, callback) {
  loading();
  products.then((product) =>
  product.forEach((productItem, index) => {
    const sectionItems = document.querySelector(elementClass);
    sectionItems.appendChild(callback(productItem));
    const button = sectionItems.children[index].childNodes[3];
    button.addEventListener('click', () => productItemToCart(productItem));
  }));
  removeLoading();
}

function getItemFromLocalStorage() {
  const cartItems = JSON.parse(getSavedCartItems());
  total.innerHTML = sum;
  if (cartItems) {
    cartItems.forEach((item) => {
      arrayToLocalStorage.push(item);
      cartSection.appendChild(createCartItemElement(item));
    });
    sumPriceFromLocalStorage();
  }
}

window.onload = () => {
  appendElement('section .items', createProductItemElement);
  getItemFromLocalStorage();
  const cartButton = document.querySelector('.empty-cart');
  cartButton.addEventListener('click', () => {
    cartSection.innerHTML = '';
    sum = 0;
    total.innerHTML = 0;
    localStorage.clear();
  });
};
