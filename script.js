const shopCart = [];
const parent = document.querySelector('.cart__items');

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

function getAllPrices() {
  const storage = JSON.parse(getSavedCartItems());
  const itemsPrices = [];
  storage.forEach((item) => itemsPrices.push(item.salePrice));
  return itemsPrices;
}

function setCarPrice() {
  const getSpanPrice = document.querySelector('.total-price');
  const sum = getAllPrices().reduce((acc, value) => acc + value, 0);
  getSpanPrice.innerHTML = sum;
}

function cartItemClickListener(event, sku) {
  parent.removeChild(event.target);
  
  const findDeletedElem = shopCart.find((prod) => prod.sku === sku);
  const indexElem = shopCart.indexOf(findDeletedElem);
  shopCart.splice(indexElem, 1);
  saveCartItems(JSON.stringify(shopCart));
  setCarPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;

  li.addEventListener('click', (event) => cartItemClickListener(event, sku));

  return li;
}

async function addToCart(sku) {
  const productClicked = await fetchItem(sku);
  const { title: name, price: salePrice } = productClicked;
  const getOl = document.querySelector('.cart__items');
  getOl.appendChild(createCartItemElement({ sku, name, salePrice }));

  shopCart.push({ sku, name, salePrice });
  saveCartItems(JSON.stringify(shopCart));
  setCarPrice();
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(addButton);

  addButton.addEventListener('click', () => addToCart(sku));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function buildProductItem() {
  const productsList = await fetchProducts('computador');
  const getSection = document.querySelector('.items');
  productsList.forEach((obj) => {
    const productObject = {
      sku: obj.id,
      name: obj.title,
      image: obj.thumbnail,
    };
    const element = createProductItemElement(productObject);
    getSection.appendChild(element);
  });
}

function getStorage() {
  const storage = JSON.parse(getSavedCartItems());
  storage.forEach((item) => addToCart(item.sku));
}

function emptyButton() {
  const getEmptyButton = document.querySelector('.empty-cart');
  getEmptyButton.addEventListener('click', () => {
    parent.innerHTML = '';
    shopCart.splice(0, shopCart.length);
    saveCartItems(JSON.stringify(shopCart));
    setCarPrice();
  });
}
emptyButton();

window.onload = async () => {
  await buildProductItem();
  getStorage();
};
