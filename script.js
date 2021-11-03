function load() {
  const loading = document.createElement('p');
  loading.className = 'loading';
  loading.innerText = 'carregando...';
  document.querySelector('.cart').appendChild(loading);
}

function unload() {
  const loading = document.querySelectorAll('.loading');
  loading.forEach((element) => element.remove());
}

function setLocalStorage() {
  const cart = document.querySelector('.cart__items').innerHTML;
  saveCartItems(cart);
}

function createTotal() {
  const cartList = document.querySelector('.cart');
  const pTotal = document.createElement('p');
  pTotal.className = 'total-price';
  cartList.appendChild(pTotal);
}

function total() {
  const list = [];
  const cart = document.querySelectorAll('.cart__item');
  cart.forEach((element) => {
    const produto = element.innerText;
    const value = produto.substring(produto.indexOf('$') + 1);
    list.push(parseFloat(value));
  });
  const totalPrice = document.querySelector('.total-price');
  if (cart.length === 0 || cart === null) {
    totalPrice.remove();
  } else {
    const subTotal = list.reduce((previous, current) => previous + current);
    totalPrice.innerText = subTotal;
  }
  setLocalStorage();
}

function clearCart() {
  const root = document.querySelectorAll('.cart__item');
  root.forEach((element) => {
    element.remove();
  });
  total();
}

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

function cartItemClickListener(element) {
  element.target.remove();
  total();
}

function clickLoad() {
  const li = document.querySelectorAll('li');
  li.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
}

async function getLocalStorage() {
  const elements = getSavedCartItems();
  if (elements) {
  const cart = document.querySelector('.cart').lastChild.previousSibling;
  cart.innerHTML = elements;
  createTotal();
  total();
  clickLoad();
  }
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function toShoppingCart(id) {
  const l = await fetchItem(id);
  const list = {
    sku: l.id,
    name: l.title,
    salePrice: l.price,
  };
  const cartItem = createCartItemElement(list);
  const totalPrice = document.querySelector('.total-price');
  document.querySelector('.cart__items').appendChild(cartItem);
  if (totalPrice === null) createTotal();
   total();
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => toShoppingCart(sku));
  section.appendChild(button);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function allProducts(product) {
  load();
  const data = await fetchProducts(product);
  const Class = document.querySelector('.items');
  data.results.forEach((element) => {
    const productObj = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    const section = createProductItemElement(productObj);
    Class.appendChild(section);
  });
  unload();
  getLocalStorage();
}

window.onload = () => {
  allProducts('computador');
  document.querySelector('.empty-cart').addEventListener('click', clearCart);
};
