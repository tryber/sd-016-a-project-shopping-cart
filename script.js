const ol = document.querySelector('.cart__items');
const clearAllBtn = document.querySelector('.empty-cart');

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

// ajuda do miyazaki na sala do zoom
function cartItemClickListener(event) {
  event.target.remove();
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

const getID = async (sku) => {
  const fetch = await fetchItem(sku);
  const { title: name, price: salePrice } = fetch;
  createCartItemElement({ sku, name, salePrice });
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  const sectionPai = document.querySelector('.items');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const createBtn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  createBtn.addEventListener('click', () => {
    getID(sku);
  });
  section.appendChild(createBtn);
  sectionPai.appendChild(section);
}

const loadProducts = () => {
  fetchProducts('computador').then((value) => {
    value.results.forEach((item) => {
      createProductItemElement(item);
    });
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const restoreCart = () => {
  const localRestore = getSavedCartItems();
  ol.innerHTML = localRestore;
};

const resetRemoveClick = () => {
  // https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  Array.from(ol.children).forEach((child) => {
    child.addEventListener('click', cartItemClickListener);
  });
};

const clearCart = () => {
  // ajuda do Leandro Goerck na sala
  ol.innerHTML = '';
  saveCartItems(ol.innerHTML);
};

clearAllBtn.addEventListener('click', clearCart);

window.onload = () => {
  loadProducts();
  if (ol.children.length === 0) restoreCart();
  resetRemoveClick();
};
