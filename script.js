const cartItems = document.querySelector('.cart__items');
let totalPrice = 0;
const priceElement = document.querySelector('.total-price');
priceElement.innerHTML = totalPrice;

const saveStorage = () => {
  localStorage.setItem('cart', cartItems.innerHTML);
  localStorage.setItem('price', totalPrice);
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText, callback) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;

  if (e.className === 'item__add') {
    e.addEventListener('click', callback);
  }

  return e;
}

// eslint-disable-next-line no-unused-vars
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  totalPrice -= event.target.price;
  priceElement.innerHTML = totalPrice;
  console.log(totalPrice);
  event.target.parentNode.removeChild(event.target);
  saveStorage();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.price = salePrice;
  li.addEventListener('click', cartItemClickListener);
  totalPrice += salePrice;
  priceElement.innerHTML = totalPrice;
  console.log(totalPrice);
  return li;
}

const loadStorage = () => {
  cartItems.innerHTML = localStorage.cart;
  const items = document.querySelectorAll('.cart__item');
  items.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

async function addcar(event) {
  console.log('added');
  const itemDiv = event.target.parentNode;
  const itemID = itemDiv.firstChild.innerText;
  const fullItem = await fetchItem(itemID);
  console.log(fullItem.id);
  const itemObject = {
    sku: fullItem.id,
    name: fullItem.title,
    salePrice: fullItem.price,
  };
  cartItems.appendChild(createCartItemElement(itemObject));
  saveStorage();
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', addcar));
  return section;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
 
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

// eslint-disable-next-line no-unused-vars
function clearCart() {
  document.querySelector('.cart__items').innerHTML = ' ';
  totalPrice = 0;
  priceElement.innerHTML = totalPrice;
}

window.onload = () => {
  searchProducts('computador');
  loadStorage();
 };
