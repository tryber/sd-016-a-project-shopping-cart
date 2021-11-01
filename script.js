const cartElement = document.querySelector('.cart');
const cartList = document.querySelector('.cart__items');
const buttomClearCart = document.querySelector('.empty-cart');

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

function sumPrice() {
  let cart = getSavedCartItems();
  cart = JSON.parse(cart) || [];
  
  const total = cart.reduce((accumulator, item) => 
    parseFloat(accumulator) + parseFloat(item.price), 
  0);

  return total;
}

function renderTotalPrice() {
  const total = document.querySelector('.total-price') 
  || createCustomElement('span', 'total-price');

  const sumTotal = sumPrice();
  
  total.innerHTML = sumTotal;

  cartElement.appendChild(total);
}

function cartItemClickListener(event, id) {
  const cart = JSON.parse(getSavedCartItems() || []);
  const indexItemCart = cart.findIndex((item) => item.id === id);
  cart.splice(indexItemCart, 1);

  saveCartItems(JSON.stringify(cart));

  sumPrice();
  renderTotalPrice();

  event.target.remove();
}

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', (event) => cartItemClickListener(event, id));
  return li;
}

async function addToCart(id) {
  const item = await fetchItem(id);
  const itemElement = createCartItemElement(item);
  cartList.appendChild(itemElement);

  let cart = getSavedCartItems();
  cart = JSON.parse(cart) || [];

  cart.push({ id: item.id, title: item.title, price: item.price });

  saveCartItems(JSON.stringify(cart));
  
  renderTotalPrice();
}

function loadCart() {
  let cart = getSavedCartItems();
  cart = JSON.parse(cart) || [];

  cart.forEach((item) => {
    const itemElement = createCartItemElement(item);
    cartList.appendChild(itemElement);
  });

  renderTotalPrice();
}

function clearCart() {
  const elementTotalPrice = document.querySelector('.total-price');
  localStorage.removeItem('cartItems');
  cartList.innerHTML = '';
  elementTotalPrice.innerHTML = '';
}

buttomClearCart.addEventListener('click', clearCart);

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonAddCart = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonAddCart.addEventListener('click', () => addToCart(sku));
  section.appendChild(buttonAddCart);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// Feito através do vídeo do Bê
async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItem = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItem.appendChild(productItem);
  });
}

window.onload = () => { 
  searchProducts('computador');
  loadCart();
};
