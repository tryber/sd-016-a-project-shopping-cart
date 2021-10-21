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

// async function cartItemClickListener(event) {
//   console.log('aalo');
// }

// function createCartItemElement({ sku, name, salePrice }) {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//   li.addEventListener('click', cartItemClickListener);
//   return li;
// }

// function consoli() {
//   console.log('oi');
// }

// function inputCartItem() {
//   // const olCart = document.querySelector('.cart__items');
//   // const buttons = document.querySelectorAll('.item__add');
//   // buttons.addEventListener('click', (button) => {
//   //   console.log(button.parentElement.firstElementChild);
//   // });
// }

const createPage = async (product) => {
  try {
    const data = await fetchProducts(product);
    const itemSection = document.querySelector('.items');
    await data.results.forEach((item) => {
      const { id: sku, title: name, thumbnail: image } = item;
      itemSection.appendChild(createProductItemElement({ sku, name, image }));
    });
  } catch (error) {
    console.log(`Ocorreu um erro: ${error}`);
  }
};

createPage();

window.onload = () => {
  createPage('computador');
  // inputCartItem();
};
