// Código só foi possívl graças à união da classe for(ever).
// a União faz a força!
const getOl = document.querySelector('.cart__items');
const cartSection = document.querySelector('.cart');
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
  saveCartItems(getOl.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addToCart(id) {
  const request = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = request;
  const cartList = createCartItemElement({ sku, name, salePrice });
  getOl.appendChild(cartList);
  saveCartItems(getOl.innerHTML);
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const getSectionItems = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const clickableButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho');
  clickableButton.addEventListener('click', () => {
    addToCart(sku);
  });
  section.appendChild(clickableButton);
  getSectionItems.appendChild(section);
  return section;
}

function load() {
  const loading = document.createElement('p');
  loading.className = 'loading';
  loading.innerText = 'carregando...';
  cartSection.appendChild(loading);
}

function unload() {
  const loading = document.querySelector('.loading');
  cartSection.removeChild(loading);
}

async function listOfProducts(categoria) {
  load();
  const request = await fetchProducts(categoria);
  request.forEach((product) => createProductItemElement(product));
  unload();
}

// const listOfProducts = (categoria) => {
//   load();
//   fetchProducts(categoria)
//   .then((value) =>
//     value.forEach((product) => createProductItemElement(product))
//     unload);
// };

function restoreCart() {
  getOl.innerHTML = getSavedCartItems();
}

function clearCart() {
  getOl.innerHTML = '';
  saveCartItems(getOl.innerHTML);
}

getOl.addEventListener('click', cartItemClickListener);
document.querySelector('.empty-cart').addEventListener('click', clearCart);

window.onload = () => { 
  listOfProducts('computador');
  restoreCart();
};
