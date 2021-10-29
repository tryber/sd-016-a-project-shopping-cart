const cart = document.querySelector('.cart__items');
const cartPrice = document.querySelector('.total-price');

async function updateCartPrice() {
  const cartList = document.querySelectorAll('.cart__item');
  let value = 0;

  if (cartList.length === 0) {
    cartPrice.innerText = value;
    return 0;
  }

  cartList.forEach((item) => {
    const product = item.innerText.split('$');
    value += parseFloat(product[1]);
  });

  cartPrice.innerText = value;
}

function clearCart() {
  cart.innerHTML = '';
  cartPrice.innerText = 0;
  saveCartItems(cart.innerHTML);
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

function cartItemClickListener(event) {
  cart.removeChild(event.target);
  saveCartItems(cart.innerHTML);
  updateCartPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addToCart(event) {
  const result = await fetchItem(event.target.id);

  const { id, title, price } = result;
  const object = { sku: id, name: title, salePrice: price };
  const item = createCartItemElement(object);
  cart.appendChild(item);
  saveCartItems(cart.innerHTML);
  updateCartPrice();
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', addToCart);
  button.id = sku;
  section.appendChild(button);

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

async function loadData(product) {
  const items = document.querySelector('.items');
  const loading = document.createElement('span');
  loading.className = 'loading';
  loading.innerText = 'carregando...';
  items.appendChild(loading);
  const result = await fetchProducts(product);
  items.removeChild(loading);

  result.results.forEach((item) => {
    const { id, title, thumbnail } = item;
    const object = {
      sku: id, name: title, image: thumbnail,
    };
    const productItem = createProductItemElement(object);
    items.appendChild(productItem);
  });
}

function loadCart() {
  document.querySelector('.cart__items').innerHTML = getSavedCartItems();
  const cartList = document.querySelectorAll('.cart__item');

  cartList.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });

  updateCartPrice();
}

window.onload = () => {
  loadData('computador');
  loadCart();

  document.querySelector('.empty-cart').addEventListener('click', clearCart);
};
