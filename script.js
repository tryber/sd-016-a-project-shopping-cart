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

function cartItemClickListener() {
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
  const { title: name, price: salePrice } = allItens;
  createCartItemElement({ sku, name, salePrice });
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
    addItemToCart(sku);
  });
  return section;
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

function deleteItemsCart() {
  const itemsCart = document.querySelectorAll('.cart__item');
  itemsCart.forEach((item) => {
    item.remove();
  });
}

function addEventButtonCart() {
  const buttonDelete = document.querySelector('.empty-cart');
  buttonDelete.addEventListener('click', deleteItemsCart);
}

window.onload = () => { 
  allProducts();
  if (ol.children.length === 0) getLocalStorage();
  eventCart();
  addEventButtonCart();
};
