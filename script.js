const olListCart = document.querySelector('.cart__items');

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
  // Graças ao Miyazaki!!!!!!
  event.target.remove();
  saveCartItems(olListCart.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  olListCart.appendChild(li);
  saveCartItems(olListCart.innerHTML);
  // O Bê mandou tirar!!! Tinha um "return li" aqui
}

const addCartItem = async (sku) => {
  const fetch = await fetchItem(sku);
  const { title: name, price: salePrice } = fetch;
  createCartItemElement({ sku, name, salePrice });
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  const sectionElement = document.querySelector('.items');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const createButtonEvent = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  createButtonEvent.addEventListener('click', () => {
    addCartItem(sku);
  });
  section.appendChild(createButtonEvent);
  
  sectionElement.appendChild(section);
  // O Bê mandou tirar!!! Tinha um "return section" aqui
}

const fetchProductsReturn = () => fetchProducts('computador').then((value) => {
  value.results.forEach((product) => {
    createProductItemElement(product);
  });
});

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const cartItemsRestore = () => {
  const localStorageRestore = getSavedCartItems();
  olListCart.innerHTML = localStorageRestore;
};

const restoreEventListenerCartItem = () => {
  /*
  Method extracted from:
  https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  */
  Array.from(olListCart.children).forEach((child) => {
    child.addEventListener('click', cartItemClickListener);
  });
};

window.onload = () => {
  fetchProductsReturn();
  if (olListCart.children.length === 0) cartItemsRestore();
  restoreEventListenerCartItem();
};
