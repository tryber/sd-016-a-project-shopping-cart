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
}

function createCartItemElement({ sku, name, salePrice }) {
  const getListCart = document.querySelector('.cart__items');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  getListCart.appendChild(li);
}

const addItemIdToCart = async (sku) => {
  const fetch = await fetchItem(sku);
  const { title: name, price: salePrice } = fetch;
  createCartItemElement({ sku, name, salePrice });
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const SectionItens = document.querySelector('.items');

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const createEventButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  createEventButton.addEventListener('click', () => {
    addItemIdToCart(sku);
  });
  section.appendChild(createEventButton);
  SectionItens.appendChild(section);
}

const getProducts = () => {
fetchProducts('computador').then((response) => {
  response.results.forEach((product) => {
    createProductItemElement(product);
  });
});
};

// const getItems = () => {
//   fetchItem()
// }

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// function createCartItemElement({ sku, name, salePrice }) {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//   li.addEventListener('click', cartItemClickListener);
//   return li;
// }

window.onload = () => {
  getProducts();
 };
