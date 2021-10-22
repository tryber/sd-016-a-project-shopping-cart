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
  event.target.remove();
  const itemsCart = document.querySelector('.cart__items');
  const content = itemsCart.innerHTML;
  saveCartItems(content);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const loadProducts = async () => {
  const getItems = document.querySelector('.items');
  const array = await fetchProducts('computador');
  array.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    getItems.appendChild(createProductItemElement({ sku, name, image }));
  }); 
};

const addToCart = async (event) => {
  const cart = document.querySelector('ol');
  const idProduct = getSkuFromProductItem(event.path[1]);
  const item = await fetchItem(idProduct);
  const { id: sku, title: name, price: salePrice } = item;
  cart.appendChild(createCartItemElement({ sku, name, salePrice }));
  const itemsCart = document.querySelector('.cart__items');
  const content = itemsCart.innerHTML;
  saveCartItems(content);
};

const setupAddToCart = () => {
  const buttonCart = document.querySelectorAll('.item__add');
  buttonCart.forEach((buttonAdd) => {
    buttonAdd.addEventListener('click', addToCart);
  });
};

const addActionLi = () => {
  const cartItens = document.querySelectorAll('.cart__item');
  cartItens.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

const restore = () => {
  const cart = document.querySelector('ol');
  const restoredList = getSavedCartItems();
  cart.innerHTML = restoredList;
  addActionLi();
};

const clearCart = () => {
  const buttonCart = document.querySelectorAll('.cart__item');
  buttonCart.forEach((item) => {
    item.remove();
  });
};

const bntClear = document.querySelector('.empty-cart');

window.onload = async () => { 
  await loadProducts();
  restore(); 
  setupAddToCart();
};

bntClear.addEventListener('click', clearCart);
