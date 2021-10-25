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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  // localStorage.removeItem(event.target);
}

function saveToStorage() {
  const cartList = document.getElementById('cart-items').innerHTML;
  const arr = [];
  const newList = cartList.split('</li>');
  newList.forEach((item) => {
    arr.push(item.slice(28));
  });
  arr.pop();
  console.log(arr);
  saveCartItems(arr);
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
  const ol = document.querySelector('.cart__items');
  const obj = { sku: search.id, name: search.title, salePrice: search.price };
  const itemElement = createCartItemElement(obj);
  saveToStorage();
  ol.appendChild(itemElement);
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
  const section = document.querySelector('.items');
  search.results.forEach((result) => {
    const obj = { sku: result.id, name: result.title, image: result.thumbnail };
    const item = createProductItemElement(obj);
    section.appendChild(item);
  });
}

window.onload = () => {
  getProducts('computador');
  getSavedCartItems();
};
