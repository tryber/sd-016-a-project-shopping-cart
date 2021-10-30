const cartList = document.querySelector('.cart__items');

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

function TotalPrice() {
  const price = localStorage.getItem('price') ? localStorage.getItem('price') : 0;
  if (document.querySelector('.total-price')) {
    document.querySelector('.total-price').innerText = parseFloat(price);
  } else {
    const cart = document.querySelector('.cart');
    cart.appendChild(createCustomElement('p', 'total-price', parseFloat(price)));
  }
}

function cartItemClickListener(event) {
  const currResult = parseFloat(localStorage.getItem('price'));
  event.target.classList.remove('cart__item');
  const priceTarget = event.target.classList;
  const result = currResult - parseFloat(priceTarget);
  localStorage.setItem('price', result);
  TotalPrice();
  event.target.remove();
  saveCartItems(cartList.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.className += ` ${salePrice}`;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function setTotalPriceItem(price) {
  if (localStorage.getItem('price')) {
    const prices = localStorage.getItem('price');
    const result = parseFloat(prices) + price;
    localStorage.setItem('price', result);
  } else {
    localStorage.setItem('price', price);
  }
}

async function addItemCart(id) {
  const product = await fetchItem(id);
  cartList.appendChild(createCartItemElement(product));
  setTotalPriceItem(product.price);
  saveCartItems(cartList.innerHTML);
  TotalPrice();
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const sectionItems = document.querySelector('.items');
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => {
    addItemCart(sku);
  });
  section.appendChild(button);
  sectionItems.appendChild(section);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function listProducts(user) {
  const fetchReturn = await fetchProducts(user);
  document.querySelector('.items').removeChild(document.querySelector('.loading'));
  fetchReturn.results.forEach((product) => {
  createProductItemElement(product);
  });
}

function restoreCart() {
  cartList.innerHTML = getSavedCartItems();
  Array.from(cartList.children).forEach((item) =>
  item.addEventListener('click', cartItemClickListener));
  TotalPrice();
}

function emptyCart() {
  document.querySelector('.empty-cart').addEventListener('click', () => {
    cartList.innerHTML = '';
    saveCartItems(cartList.innerHTML);
    localStorage.setItem('price', '0');
    TotalPrice();
  });
} 

window.onload = () => {
  listProducts('computador');
  restoreCart();
  TotalPrice();
  emptyCart();
};