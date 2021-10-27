function totalPrice() {
  const cartItems = document.querySelectorAll('.cart__item');
  let price = 0;
  cartItems.forEach((item) => {
    price += item.price;
  });
  const total = document.querySelector('.total-price');
  total.innerHTML = price;
}

function cartItemClickListener() {
  const list = document.querySelector('.cart__items');
  list.removeChild(this);
  totalPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.sku = sku;
  li.price = salePrice;
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function sendItemToCart(i) {
  const item = await fetchItem(i);
  const { id, title, price } = item;
  const list = document.querySelector('.cart__items');
  list.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  totalPrice();
}

function getSkuFromProductItem() {
  sendItemToCart(this.parentNode.querySelector('span.item__sku').innerText);
  return this.parentNode.querySelector('span.item__sku').innerText;
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
  if (element === 'button') {
    e.addEventListener('click', getSkuFromProductItem);
  } 
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

async function getProducts(product) {
  const productSearch = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  productSearch.results.forEach((computer) => {
    const eachComputer = {
    sku: computer.id, name: computer.title, image: computer.thumbnail };
    const appendProduct = createProductItemElement(eachComputer);
    sectionItems.appendChild(appendProduct);
  });
}

window.onload = () => {
  getProducts('computador');
};
