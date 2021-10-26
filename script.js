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

const cartItems = document.querySelector('.cart__items');

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

async function saveToStorage() {
  const cartList = document.getElementById('cart-items').innerText;
  saveCartItems(cartList.split('\n'));
}

function removeFromStorage() {
  localStorage.removeItem('cartItems');
  saveToStorage();
}

const sumPrices = async () => {
  const priceTag = document.getElementById('total-price');
  const items = getSavedCartItems();
  const newString = [];
  for (let i = 0; i < items.length; i += 1) {
    newString.push(Number.parseFloat(items[i].slice(-4), 10));
  }
  const newPrice = newString.reduce((acc, item) => acc + item);
  priceTag.innerText = `${newPrice.toFixed(2)}`;
};

async function cartItemClickListener(event) {
  event.target.remove();
  removeFromStorage();
  sumPrices();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addToCart(itemID) {
  const search = await fetchItem(itemID);
  const ol = cartItems;
  const obj = { sku: search.id, name: search.title, salePrice: search.price };
  const itemElement = createCartItemElement(obj);
  ol.appendChild(itemElement);
  saveToStorage();
  await sumPrices();
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btn = createCustomElement(
    'button',
    'item__add',
    'Adicionar ao carrinho!',
  );
  section.appendChild(btn);
  btn.addEventListener('click', async () => {
    await addToCart(sku);
  });
  return section;
}

async function getProducts(param) {
  const search = await fetchProducts(param);
  document.getElementById('loading').remove();
  const section = document.querySelector('.items');
  search.results.forEach((result) => {
    const obj = { sku: result.id, name: result.title, image: result.thumbnail };
    const item = createProductItemElement(obj);
    section.appendChild(item);
  });
}

function fillCartStorage() {
  const cart = cartItems;
  const items = getSavedCartItems();
  if (items === null) return;
  items.forEach((item) => {
    const li = document.createElement('li');
    li.innerText = item;
    li.addEventListener('click', cartItemClickListener);
    cart.appendChild(li);
  });
}

const emptyCart = () => {
  localStorage.clear();
  const list = cartItems;
  list.innerHTML = '';
};

const loading = () => {
  const span = document.createElement('span');
  span.id = 'loading';
  span.className = 'loading';
  const text = 'carregando...';
  span.innerText = text;
  document.body.appendChild(span);
};

document.getElementById('empty-cart').addEventListener('click', emptyCart);

window.onload = () => {
  loading();
  getProducts('computador');
  fillCartStorage();
};
