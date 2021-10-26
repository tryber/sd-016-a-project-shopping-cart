// Projeto feito com ajuda de Rafael Santos e Emerson Moreira
const ol = document.querySelector('.cart__items');
const tagTotalValue = document.querySelector('.total-price');

function clearAll() {
  const buttonClearAll = document.querySelector('.empty-cart');
  buttonClearAll.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    ol.innerHTML = '';
    tagTotalValue.innerText = '0,00';
    });
  }
clearAll();

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

function sumTheCart(storage) {
  const value = storage.reduce((acc, item) => acc + item.salePrice, 0);
  tagTotalValue.innerText = `${value}`;
}

function removeItemOfStorage(sku) { // Função criada com ajuda de Rafael Santos e Emerson Moreira
  const storage = JSON.parse(localStorage.getItem('cartItems'));
  const cartProduct = storage.find((item) => item.sku === sku);
  const capthIndexOfProduct = storage.indexOf(cartProduct);
  storage.splice(capthIndexOfProduct, 1);
  saveCartItems(JSON.stringify(storage));
  sumTheCart(storage);
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

async function captureFetch(sku) {
  const storage = JSON.parse(getSavedCartItems()) || [];
  const returnOfFetchItem = await fetchItem(sku);
  const { title: name, price: salePrice } = returnOfFetchItem;
  ol.appendChild(createCartItemElement({ sku, name, salePrice }));
  storage.push({ sku, name, salePrice });
  saveCartItems(JSON.stringify(storage));
  sumTheCart(storage);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const createButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  createButton.addEventListener('click', () => captureFetch(sku));
  section.appendChild(createButton);

  return section;
}

const itensSection = document.querySelector('.items');

function createTagLoading() {
  const sectionOfItens = document.querySelector('.items');
  const tagLoading = document.createElement('span');
  tagLoading.className = 'loading';
  tagLoading.innerText = 'carregando...';
  sectionOfItens.appendChild(tagLoading);
}

function removeTagLoading() {
  const tagLoading = document.querySelector('.loading');
  tagLoading.remove();
}

async function addProducts() {
  createTagLoading();
  await fetchProducts('computador')
    .then((data) => {
      data.results.forEach((result) => {
      const { id: sku, title: name, thumbnail: image } = result;
      itensSection.appendChild(createProductItemElement({ sku, name, image }));
    });
  });
  removeTagLoading();
}

function saveInStorage() { // Código feito com ajuda de Rafael Santos
  const storage = JSON.parse(getSavedCartItems());
  storage.forEach((item) => ol.appendChild(createCartItemElement(item)));
}

window.onload = () => { 
  addProducts();
  tagTotalValue.innerText = '0,00';
  if (getSavedCartItems() === undefined || getSavedCartItems() === null) { // Código feito com ajuda de Rafael Santos
    return localStorage.setItem('cartItems', JSON.stringify([]));
  }
  saveInStorage();
  sumTheCart(JSON.parse(localStorage.getItem('cartItems')));
};
