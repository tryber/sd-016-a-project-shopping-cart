// const getSavedCartItems = require("./helpers/getSavedCartItems");
// const saveCartItems = require("./helpers/saveCartItems");

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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const sumPrices = () => {
  let totalPrice = 0;
  const currentCartItem = document.querySelectorAll('.cart__item');
  const priceElement = document.querySelector('.total-price');
  currentCartItem.forEach((item) => { totalPrice += parseFloat(item.innerText.split('$')[1]); });
  priceElement.innerText = totalPrice;
};

async function cartItemClickListener(event) {
  const li = event.target;
  li.innerHTML = '';
  li.remove();
  await sumPrices();
  await saveCartItems(li);
  // console.log('Salva ao Remover');
}

// eslint-disable-next-line no-unused-vars
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  saveCartItems({ sku, name, salePrice });
  // console.log('salva em createCartItemElement');
  return li;
}

async function itemProducts(itemsId) {
  const itemData = await fetchItem(itemsId);
  const sectionItem = document.querySelector('.cart__items');
  const { id: sku, title: name, price: salePrice } = itemData;
  const itemLi = createCartItemElement({ sku, name, salePrice });
  sectionItem.appendChild(itemLi);
  saveCartItems(itemsId);
  // console.log('Salva itemProducts');
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonItem = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonItem.addEventListener('click', async () => {
    await itemProducts(sku);
    await sumPrices();
  });
  section.appendChild(buttonItem);
  saveCartItems({ sku, name, image });
  // console.log('Salva itemProducts em createProductItemElement');
  // waitLoading.value = '';
  // waitLoading.innerText = '';
  return section;
}

const waitLoading = document.querySelector('.loading');

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
    waitLoading.remove();
  });
}

function emptyCart() {
  const emptyButton = document.querySelector('.empty-cart');
  const currentList = document.querySelector('.cart__items');
  emptyButton.addEventListener('click', () => {
    currentList.innerHTML = '';
    sumPrices();
  });
}
emptyCart();

window.onload = () => {
  // getSavedCartItems();
  searchProducts('computador');
  // ItemProducts('MLB1341706310');
};

// function textLoading() {
  waitLoading.innerText = 'carregando...';
  // waitLoading.value = ''
 // console.log(waitLoading.value);
// }
// textLoading();
