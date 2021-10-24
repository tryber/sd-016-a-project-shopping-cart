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
  // coloque seu código aqui
  ol.removeChild(event.target);
}

const addEvent = () => {
  ol.innerHTML = getSavedCartItems();
  const localStorageLi = document.querySelectorAll('.cart__item');
  localStorageLi.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function itemCart (event) {
  const searchSKU = getSkuFromProductItem(event.target.parentNode);
  const arrayfull = await fetchItem(searchSKU);
  const cart = createCartItemElement(arrayfull);
  ol.appendChild(cart);
  saveCartItems(ol.innerHTML);
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const sections = document.createElement('section');
  section.className = 'item';
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', itemCart);
  sections.appendChild(createCustomElement('span', 'item__sku', sku));
  sections.appendChild(createCustomElement('span', 'item__title', name));
  sections.appendChild(createProductImageElement(image));
  sections.appendChild(button);

  return sections;
}

const fetchObject = async () => {
  const arrayfull = await fetchProducts('computador');
  arrayfull.results.forEach((arr) => {
    const sections = document.querySelector('.items');
    const result = createProductItemElement(arr);
    sections.appendChild(result);
  });
};

window.onload = () => {
  fetchObject();
  addEvent();
};