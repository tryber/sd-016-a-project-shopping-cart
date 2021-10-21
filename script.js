// const { fetchItem } = require("./helpers/fetchItem");

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

// function cartItemClickListener(event) {
//   // coloque seu código aqui
//   const ol = document.querySelector('.cart__items');
//   eventTarget = event.Target;
//   ol.removeChild(eventTarget);
//   console.log('oi');
// }

function createCartItemElement({ sku, name, salePrice }) {
  const ol = document.querySelector('.cart__items');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => {
    eventTarget = event.target;
    ol.removeChild(eventTarget);
  });
  return li;
}

async function captchFetch(idItem) {
  const ol = document.querySelector('.cart__items');
  const returnOfFetchItem = await fetchItem(idItem);
  const { title: name, price: salePrice } = returnOfFetchItem;
  ol.appendChild(createCartItemElement({ sku: idItem, name, salePrice }));
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

window.onload = () => { 
  addProducts();
};
