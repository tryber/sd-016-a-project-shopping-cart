const ol = document.querySelector('.cart__items');

const buttonClearAll = document.querySelector('.empty-cart');
buttonClearAll.addEventListener('click', () => {
  ol.innerHTML = '';
  });

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

function removeItemOfStorage(sku) {
  const storage = JSON.parse(localStorage.getItem('cartItems'));
  const cartProduct = storage.find((item) => item.sku === sku);
  const capthIndexOfProduct = storage.indexOf(cartProduct);
  storage.splice(capthIndexOfProduct, 1);
  saveCartItems(JSON.stringify(storage));
}

function cartItemClickListener(event, sku) {
  event.target.remove();
  removeItemOfStorage(sku);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => cartItemClickListener(event, sku));
  return li;
}

async function captchFetch(sku) {
  const storage = JSON.parse(getSavedCartItems()) || [];
  const returnOfFetchItem = await fetchItem(sku);
  const { title: name, price: salePrice } = returnOfFetchItem;
  ol.appendChild(createCartItemElement({ sku, name, salePrice }));
  storage.push({ sku, name, salePrice });
  saveCartItems(JSON.stringify(storage));
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const createButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  createButton.addEventListener('click', () => captchFetch(sku));
  section.appendChild(createButton);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const itensSection = document.querySelector('.items');

function addProducts() {
  fetchProducts('computador')
    .then((data) => {
      data.results.forEach((result) => {
      const { id: sku, title: name, thumbnail: image } = result;
      itensSection.appendChild(createProductItemElement({ sku, name, image }));
    });
  });
}

function saveInStorage() {
  const storage = JSON.parse(getSavedCartItems());
  storage.forEach((item) => ol.appendChild(createCartItemElement(item)));
}

window.onload = () => { 
  addProducts();
  buttonClearAll();
  if (getSavedCartItems() === undefined || getSavedCartItems() === null) {
    return localStorage.setItem('cartItems', JSON.stringify([]));
  }
  saveInStorage();
};
