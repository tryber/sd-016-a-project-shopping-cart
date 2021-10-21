// const { fetchProducts } = require("./helpers/fetchProducts");
// const getSavedCartItems = require("./helpers/getSavedCartItems");
// const saveCartItems = require("./helpers/saveCartItems");
// const { fetchItem } = require("./helpers/fetchItem");
// const { fetchItem } = require("./helpers/fetchItem");
// const { fetchProducts } = require("./helpers/fetchProducts");

let moneySpent = 0;
const theDisplayPrice = document.querySelector('.total-price');
const whereToAppend = document.querySelector('.cart__items');

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

function cartItemClickListener(event) {
  const theObject = event.target;
  // const regex = /[+-]?\d+(\.\d+)?/g;
  // const string = theObject.innerText;
  // const floats = string.match(regex).map(function (v) { return parseFloat(v); }); // codigo retirado de https://stackoverflow.com/questions/17374893/how-to-extract-floating-numbers-from-strings-in-javascript para auxiliar na resolucao
  // moneySpent = ((moneySpent)*100 - (floats.at(-1))*100)/100; // at(-1) retirado de https://stackoverflow.com/questions/3216013/get-the-last-item-in-an-array para auxiliar na resolucao // ideia do *100 / 100 retirada da dúvida do Joao Melo https://app.slack.com/client/TMDDFEPFU/C02A8CKT31U/thread/C02A8CKT31U-1634835831.056600
  // theDisplayPrice.innerText = moneySpent;
  theObject.remove();
  // if (document.querySelectorAll('.cart__item').length === 0) {
  //   theDisplayPrice.innerText = '0';
  // }
  saveCartItems(whereToAppend.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addToCart(id) {
  const result = await fetchItem(id); // Pegando os dados
  const theObjectToAdd = { // criando um objeto com os dados
    sku: result.id,
    name: result.title,
    salePrice: result.price,
  };
  const theLi = createCartItemElement(theObjectToAdd);
  // theLi.addEventListener('click', cartItemClickListener);
  whereToAppend.appendChild(theLi);
  saveCartItems(whereToAppend.innerHTML); // adiciona aquilo que ta dentro do whereToAppend em uma chave.
  // // Adicionando o preco  no total
  // moneySpent += theObjectToAdd.salePrice;
  // theDisplayPrice.innerText = moneySpent;
}

function getAllBtnsAndAdd() {
  const allbtns = document.querySelectorAll('.item__add'); // pegando os botoes
  allbtns.forEach((btn) => { // adicionando a funcao de pegar o valor do ID dos items clicados
    btn.addEventListener('click', (event) => {
      const id = event.target.parentElement.firstChild.innerText;
      addToCart(id);
    });
  });
}

async function getCreateItems(item) {
  const dataResult = await fetchProducts(item);

  dataResult.forEach((result) => {
    const theResult = {
      sku: result.id,
      name: result.title,
      image: result.thumbnail,
    };
    const theProduct = createProductItemElement(theResult);
    document.querySelector('.items').appendChild(theProduct);
  });
  getAllBtnsAndAdd();
}

function emptyTheCart() {
  const allItemsInTheCart = document.querySelectorAll('.cart__item');
  for (let i = 0; i < allItemsInTheCart.length; i += 1) {
    allItemsInTheCart[i].remove();
  }
  moneySpent = 0;
  const moneySpentDisplay = document.querySelector('.total-price');
  moneySpentDisplay.innerText = `Total Price: $${moneySpent}.00`;
}

window.onload = () => { 
  // onload colocar tuod que ta na key carItem dentor do html de wheretoappend
  const allItems = getSavedCartItems();
  whereToAppend.innerHTML = allItems;
  // adicionando a funcao de excluir para todos os elementos salvor
  for (let i = 0; i < whereToAppend.children.length; i += 1) {
    whereToAppend.children[i].addEventListener('click', cartItemClickListener);
  }

  getCreateItems('computador');
  const emptyButton = document.querySelector('.empty-cart');
  emptyButton.addEventListener('click', emptyTheCart);
};
