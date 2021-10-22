const loading = document.querySelector('.loading');
const items = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getPrices() {
  const arrItems = items.childNodes;
  const values = [];
  arrItems.forEach((item) => {
    const price = item.innerHTML.split('PRICE: $');
    values.push(parseFloat(price[1]));
  });
  return values;
}

function createCustomElement(element, className, innerText) {
  const elem = document.createElement(element);
  elem.className = className;
  elem.innerText = innerText;
  return elem;
}

function cartPrice() {
  const total = document.querySelector('.total-price');
  total.innerHTML = getPrices().reduce((acc, current) => acc + current, 0);
}

function cartItemClickListener(event) {
  cartPrice();
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  items.appendChild(li);
}

async function addItemToCart(sku) {
  const allItens = await fetchItem(sku);
  const { title: name, price: salePrice, thumbnail: image } = allItens;
  createCartItemElement({ sku, image, name, salePrice });
  saveCartItems(items.innerHTML);
  cartPrice();
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  const productSection = document.querySelector('.items');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');

  section.appendChild(addButton);
  productSection.appendChild(section);
  addButton.addEventListener('click', () => {
    saveCartItems(items.innerHTML);
    addItemToCart(sku);
  });
}

const savedCart = () => {
  const storage = getSavedCartItems();
  items.innerHTML = storage;
};

const cleanCart = document.querySelector('.empty-cart');
cleanCart.addEventListener('click', () => {
  const allItems = document.querySelector('.cart__items');
  allItems.innerHTML = '';
  cartPrice();
  saveCartItems(items.innerHTML);
});

const allProducts = () => {
  fetchProducts('computador').then((response) => {
    response.results.forEach((products) => createProductItemElement(products));
    loading.remove();
  });
};

items.addEventListener('click', cartItemClickListener);

window.onload = () => {
  allProducts();
  savedCart();
  cartPrice();
};
