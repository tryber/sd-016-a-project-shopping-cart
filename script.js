// const saveCartItems = require("./helpers/saveCartItems");

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const { fetchProducts } = require("./helpers/fetchProducts");

// const getSavedCartItems = require("./helpers/getSavedCartItems");

const throwItemList = document.querySelector('.cart__items');

const countItemList = () => {
  if (throwItemList.innerHTML === '') return 0;
  const getResultLocalStorage = getSavedCartItems();
  const result = getResultLocalStorage.split('PRICE: $').reduce((acc, value) => {
    acc.push(value.substring(0, value.indexOf('<')));
    return acc;
  }, []);
  result.shift();
  const total = result.reduce((acc, curr) => Number(acc) + Number(curr));
  // console.log(result);
  document.querySelector('.total-price').innerHTML = total;
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

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(throwItemList.innerHTML);
  countItemList();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
    countItemList();
  return li;
}

const cartOfTheBuy = async (id) => {
  const objOfTheItem = await fetchItem(id);
  const objItemList = {
    sku: objOfTheItem.id,
    name: objOfTheItem.title,
    salePrice: objOfTheItem.price,
  };
  throwItemList.appendChild(createCartItemElement(objItemList));
  saveCartItems(throwItemList.innerHTML);
   countItemList();
};

function createButton() {
  const buttonRemove = document.querySelector('.empty-cart');
  buttonRemove.addEventListener('click', () => {
    throwItemList.innerHTML = '';
  });
   countItemList();
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const getButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  getButton.addEventListener('click', () => cartOfTheBuy(sku));
  section.appendChild(getButton);
   countItemList();
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function getProducts(product) {
  const searchData1 = await fetchProducts(product);
  const sectionId = document.querySelector('.items');
  searchData1.results.forEach((item) => {
    const itemObj = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const objAndSection = createProductItemElement(itemObj);
    sectionId.appendChild(objAndSection);
  });
}

const refreshPage = () => {
  const getResult = getSavedCartItems();
  throwItemList.innerHTML = getResult;
   countItemList();
};

const restoreEventListener = () => {
  throwItemList.addEventListener('click', cartItemClickListener);
   countItemList();
};

window.onload = () => {
  getProducts('computador');
  refreshPage();
  restoreEventListener();
  createButton();
  countItemList();
};
