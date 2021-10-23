const productConteiner = document.querySelector('.items');
const getCart = () => document.querySelector('.cart__items');
const getCartConteiner = () => document.querySelector('.cart');
const clearButton = document.querySelector('.empty-cart');
let allPrices = [0];

function clearCart() {
  const cartConteiner = getCart();
  cartConteiner.innerHTML = '';
  localStorage.removeItem('cartItems');
  localStorage.removeItem('price');
}

const updatePriceArray = (removedPrices = 0) => {
  const priceSum = allPrices.reduce((acc, currValue) => (acc * 100 + currValue * 100) / 100);
  const updatedPrice = (priceSum * 100 - removedPrices * 100) / 100;
  allPrices = [updatedPrice];
  return updatedPrice;
};

const updatePriceTag = () => {
  const savedPrice = localStorage.getItem('price');
  document.querySelector('.total-price').innerHTML = savedPrice;
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

function priceToLocalStorage(price) {
  const priceSum = updatePriceArray(price);
  localStorage.setItem('price', priceSum);
}

function setToLocalStorage() {
  const cartConteiner = document.querySelector('.cart__items').innerHTML;
  saveCartItems(cartConteiner);
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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const price = Number(event.target.className.match(/(\d+)/)[0]) / 100;
  event.target.remove();
  setToLocalStorage();
  priceToLocalStorage(price);
  updatePriceTag();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = `cart__item ${salePrice * 100}`;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  allPrices.push(salePrice);
  return li;
}

function addToCart(event) {
  const buttonHTML = event.target;
  const product = buttonHTML.parentNode;
  const productId = getSkuFromProductItem(product);
  const itemObj = fetchItem(productId);
  const cartConteiner = getCart();
  itemObj
  .then((object) => {
    const sku = object.id;
    const name = object.title;
    const salePrice = object.price;
    cartConteiner.appendChild(
      createCartItemElement({ sku, name, salePrice }),
    );
  setToLocalStorage();
  priceToLocalStorage();
  updatePriceTag();
  });
}

function addOnClickToButton() {
  const allButtons = document.querySelectorAll('.item__add');
  allButtons.forEach((button) => button.addEventListener('click', addToCart));
}

function getFromLocalStorage() {
  const cartConteiner = getCart();
  const conteinerElements = getSavedCartItems();
  cartConteiner.innerHTML = conteinerElements;
  cartConteiner.addEventListener('click', cartItemClickListener);
}

function createPriceText() {
  const cartWindow = getCartConteiner();
  const priceConteiner = createCustomElement('div', 'total-price-conteiner', '');
  cartWindow.appendChild(priceConteiner);
  const priceText = createCustomElement('div', 'total-price-text', 'Total: R$');
  priceConteiner.appendChild(priceText);
}

function createPriceValue() {
  const priceConteiner = document.querySelector('.total-price-conteiner');
  const priceTag = createCustomElement('div', 'total-price', 0);
  priceConteiner.appendChild(priceTag);
}

async function getProductData(search) {
  const arrayOfProducts = await fetchProducts(search);
  arrayOfProducts.results.forEach((product) => {
    const sku = product.id;
    const name = product.title;
    const image = product.thumbnail;
    productConteiner.appendChild(
      createProductItemElement({ sku, name, image }),
    );
  });
}

async function asyncAwait() {
  await getProductData('computador');
  addOnClickToButton();
  getFromLocalStorage();
}

window.onload = () => {
  asyncAwait();
  clearButton.addEventListener('click', clearCart);
  createPriceText();
  createPriceValue();
};
