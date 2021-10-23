const cartItems = '.cart__items';
const total = document.querySelector('.total-price');
let totalPrice = 0;

function loadingPage() {
  const h2 = document.createElement('h2');
  h2.className = 'loading';
  const section = document.querySelector('.items');
  h2.innerText = 'carregando...';
  section.appendChild(h2);
}

function loaded() {
  const section = document.querySelector('.items');
  const loading = document.querySelector('.loading');
  section.removeChild(loading);
}

function getCartItemsUpdated() {
  const cartItemsList = document.querySelector(cartItems);
  saveCartItems(cartItemsList);
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
  return e;
}

function cartItemClickListener(event) {
  const cartShopItems = document.querySelector(cartItems);
  cartShopItems.removeChild(event.target);
  getCartItemsUpdated();
}

function createCartItemElement({ sku, name, salePrice }) { 
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function getTotalPrice(price) {
  await price;
  totalPrice += price;
  total.innerText = `Total: R$${totalPrice}`;
}

async function addItemToCart(id) {
  const cart = document.querySelector(cartItems);
  const data = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = await data;
  await getTotalPrice(salePrice);
  const product = createCartItemElement({ sku, name, salePrice });
  cart.appendChild(product);
}

// Código feito com a ajuda de Vitor Brandão, Renan Souza, Lucas Alves, Matheus Benini, Italo Moraes, Rafael Feliciano, Julia Barcelos
function createProductItemElement({ sku, name, image }) {  
    const getSectionItems = document.querySelector('.items');
    const section = document.createElement('section');
    section.className = 'item';
  
    section.appendChild(createCustomElement('span', 'item__sku', sku));
    section.appendChild(createCustomElement('span', 'item__title', name));
    section.appendChild(createProductImageElement(image));
    
    const newButton = section
      .appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
    newButton.addEventListener('click', () => {
      addItemToCart(sku);
      });

    section.appendChild(newButton);
    getSectionItems.appendChild(section);
    return section;
}

function cleanCartList() {
  const cartList = document.querySelector(cartItems);
  const cleanCartListButton = document.querySelector('.empty-cart');
  cleanCartListButton.addEventListener('click', () => {
// Lógica da repetição while vista em https://stackoverflow.com/questions/43317676/javascript-error-uncaught-typeerror-failed-to-execute-removechild-on-node
    while (cartList.firstChild) {
      cartList.removeChild(cartList.firstChild);
    }
    totalPrice = 0;
    total.innerText = `Total: R$${totalPrice}`;
  });
  getCartItemsUpdated();
}

async function searchProducts(product) {
  loadingPage();
  const data = await fetchProducts(product);
  if (data) {
    loaded();
  }
  const sectionItem = document.querySelector('.items');
  data.results.forEach((productItem) => {
    const { id: sku, title: name, thumbnail: image } = productItem;
    const item = createProductItemElement({ sku, name, image });
    sectionItem.appendChild(item);
  });
}

window.onload = () => { 
  searchProducts('computador');
  cleanCartList();
};
