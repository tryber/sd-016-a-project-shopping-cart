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
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItemToCart = async (item) => {
  const olItems = document.querySelector('.cart__items');
  const data = await fetchItem(item);
  const { id: sku, title: name, price: salePrice } = data;
  const itemCart = createCartItemElement({ sku, name, salePrice });
  olItems.appendChild(itemCart);
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonAdd = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(buttonAdd);
  buttonAdd.addEventListener('click', () => addItemToCart(sku));
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// help from teacher Bernardo!
const serchProducts = async (product) => {
  const data = await fetchProducts(product);
  const section = document.querySelector('.items');
  data.results.forEach((item) => {
    const { id: sku, title: name, thumbnail: image } = item;
    const productItem = createProductItemElement({ sku, name, image });
    section.appendChild(productItem);
  });
};

window.onload = () => {
  serchProducts('computador');
  addItemToCart('MLB1615760527');
};
