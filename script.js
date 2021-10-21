// const { fetchProducts } = require("./helpers/fetchProducts");
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

const createProductItemElementFromFetchProduct = async (products) => {
  const sectionItems = document.querySelector('.items');
  const data = await fetchProducts(products);
  data.results.forEach(({ id, title, thumbnail }) => {
    const obj = {
      sku: id,
      name: title,
      image: thumbnail,
    };
    const proudctItem = createProductItemElement(obj);
    sectionItems.appendChild(proudctItem);
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const createCartItemElementFromFetchItem = async (products) => {
  const cartItems = document.querySelector('.cart__items');
  const data = await fetchItem(products);

  const obj = {
    sku: data.id,
    name: data.title,
    salePrice: data.price,
  };

  const proudctItem = createCartItemElement(obj);
  cartItems.appendChild(proudctItem);
};

window.onload = () => {
  createProductItemElementFromFetchProduct('computador');
  createCartItemElementFromFetchItem('MLB1615760527');
};
