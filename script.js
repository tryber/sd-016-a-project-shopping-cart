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
  // if (element === 'button') {
  //   e.addEventListener('click', addProductToCart(clikedButton));
  // }
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

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

async function addToCart(item) {
  const data = await fetchItem(item.innerText);
  const cartItens = document.querySelector('.cart__items');
  cartItens.appendChild(createCartItemElement(data));
}

function receiveClick() {
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('item__add')) {
      return addToCart(event.target.parentNode.firstChild);
    }
  });
}

window.onload = () => {
  createPage('computador');
  receiveClick();
};
