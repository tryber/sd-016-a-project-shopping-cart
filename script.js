const cart = document.querySelector('.cart__items');

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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const totalElement = document.querySelector('.total-price');
// OBSERVAÇÃO: Cypress não está avaliando o projeto ao tentar recuperar o total no localStorage
// ao implementar esta funcionalidade, allPrices deve ser tipo "let"
let allPrices = [];
const reduceFunction = (accumulator, currentValue) => accumulator + currentValue;
const totalPurchase = () => allPrices.reduce(reduceFunction, 0);

function addPrice(price) {
  allPrices.push(price);
  totalElement.innerHTML = `${totalPurchase()}`;
  localStorage.setItem('total', JSON.stringify(allPrices));
}

function removePrice(index) {
  allPrices.splice(index, 1);
  totalElement.innerHTML = `${totalPurchase()}`;
  localStorage.setItem('total', JSON.stringify(allPrices));
}

function cartItemClickListener(event) {
  const clickedItem = event.target;
  // ** REQUISITO **
  const indexOfClickedItem = Array.from(cart.children).indexOf(clickedItem);
  removePrice(indexOfClickedItem);

  clickedItem.remove();

  saveCartItems(cart.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const loadingElement = document.querySelector('.loading');

async function createComputerList() {
  const computerList = await fetchProducts('computer');
  loadingElement.remove();
  computerList.results.forEach((computer) => {
    const skuNameImage = {
      sku: computer.id,
      name: computer.title,
      image: computer.thumbnail,
    };
    const itemListElement = document.querySelector('.items');
    const createSection = createProductItemElement(skuNameImage);
    itemListElement.appendChild(createSection);
  });
}

async function addItemToCart(event) {
  const eventSection = event.target.parentElement;
  const fetchItemData = await fetchItem(getSkuFromProductItem(eventSection));

  const skuNameSalePrice = {
    sku: fetchItemData.id,
    name: fetchItemData.title,
    salePrice: fetchItemData.price,
  };

  addPrice(skuNameSalePrice.salePrice);
  const newLiItem = createCartItemElement(skuNameSalePrice);
  newLiItem.addEventListener('click', cartItemClickListener);
  cart.appendChild(newLiItem);

  saveCartItems(cart.innerHTML);
}

function addListenersToButtons() {
  const buttonsAddToCart = document.querySelectorAll('.item__add');
  buttonsAddToCart.forEach((button) => {
    button.addEventListener('click', addItemToCart);
  });
}

function addListenersToCartItems() {
  const items = document.querySelectorAll('.cart__item');
  items.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
}

function clearCart() {
  allPrices.splice(0, allPrices.length);
  localStorage.setItem('total', JSON.stringify(allPrices));

  totalElement.innerHTML = `${totalPurchase()}`;
  cart.innerHTML = '';
  saveCartItems(cart.innerHTML);
}

const clearCartButton = document.querySelector('.empty-cart');
clearCartButton.addEventListener('click', clearCart);

function recreateCart() {
  const savedCartItems = localStorage.getItem('cartItems');
  cart.innerHTML = savedCartItems;
}

async function generatePage() {
  await createComputerList();
  addListenersToButtons();
}

window.onload = () => {
  generatePage();
  recreateCart();
  addListenersToCartItems();
  // OBSERVAÇÃO: Cypress não está avaliando o projeto ao tentar recuperar o total no localStorage
  if (localStorage.getItem('cartItems') === null) return localStorage.setItem('total', []);
  allPrices = JSON.parse(localStorage.getItem('total'));
  totalElement.innerHTML = `${totalPurchase()}`;
};
