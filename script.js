const ol = document.querySelector('.cart__items');

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
  const li = document.querySelector('li');
  li.remove();
  saveCartItems(ol.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  ol.appendChild(li);
  saveCartItems(ol.innerHTML);
}

async function addItemToCart(sku) {
  const allItens = await fetchItem(sku);
  const { title: name, price: salePrice, thumbnail: image } = allItens;
  createCartItemElement({ sku, name, salePrice });
  // saveCartItems(itemElements.innerHTML);
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const sectionDad = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(addButton);
  sectionDad.appendChild(section);
  addButton.addEventListener('click', () => {
    // saveCartItems(itemElements.innerHTML);
    addItemToCart(sku);
  });
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const allProducts = () => {
  fetchProducts('computador').then((response) => {
    response.forEach((products) => createProductItemElement(products));
  });
};

function getLocalStorage() {
  const cartItens = getSavedCartItems();
  ol.innerHTML = cartItens;
}

function eventCart() {
  Array.from(ol.children).forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
}

window.onload = () => { 
  allProducts();
  if (ol.children.length === 0) getLocalStorage();
  eventCart();
};
