const getButton = document.querySelector('.empty-cart');
const ol = document.querySelector('.cart__items');
const loading = document.querySelector('.loading');
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
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  ol.appendChild(li);
  saveCartItems(ol.innerHTML);
  // return li;
}

// Ajuda do Victor Faria - Turma 11/ Emerson Moreira e Julia Barcelos(Turma 16 - For(ever))
const addItemToShopCart = async (id) => {
  const listItems = await fetchItem(id);
  const { title, price } = listItems;
  createCartItemElement({
    id,
    title,
    price,
  });
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const sectionFather = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const createButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  createButton.addEventListener('click', () => {
    addItemToShopCart(sku);
  });
  section.appendChild(createButton);
  sectionFather.appendChild(section);
  // return section; -- o Bê mandou tirar
}

const listProducts = () => fetchProducts('computador').then((value) => {
  value.results.forEach((item) => {
    createProductItemElement(item);
  });
  loading.remove();
});

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const saveLocalStorage = () => {
  ol.innerHTML = getSavedCartItems();
};

// https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
const resetAddEventListener = () => {
  Array.from(ol.children).forEach((value) => {
    value.addEventListener('click', cartItemClickListener);
  });
};

const clearAll = () => {
  ol.innerHTML = '';
  saveCartItems(ol.innerHTML);
};

getButton.addEventListener('click', clearAll);

window.onload = () => {
  listProducts();
  if (ol.children.length === 0) saveLocalStorage();
  resetAddEventListener();
};
