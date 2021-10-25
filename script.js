const cartItems = document.querySelector('.cart__items');
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

// Lógica criada com a ajuda de Vitor Brandao, Renan Souza, Matheus Benini, Josué, Lucas Alves

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

function subtractItemsPrice(price) {
  totalPrice -= parseFloat(price);
  if (totalPrice % 1 !== 0) {
    total.innerHTML = totalPrice;
    return;
  }
  total.innerHTML = totalPrice.toFixed(0);
}

function cartItemClickListener(event) {
  cartItems.removeChild(event.target);
  const price = event.target.innerText.split('$');
  saveCartItems(cartItems.innerHTML);
  subtractItemsPrice(price[1]);
}

function createCartItemElement({ sku, name, salePrice }) { 
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function sumItemsPrice(price) {
  await price;
  totalPrice += parseFloat(price);
  if (totalPrice % 1 !== 0) {
    total.innerHTML = totalPrice;
    return;
  }
  total.innerHTML = totalPrice.toFixed(0);
}

async function addItemToCart(id) {
  const data = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = await data;
  await sumItemsPrice(salePrice);
  const product = createCartItemElement({ sku, name, salePrice });
  cartItems.appendChild(product);
  saveCartItems(cartItems.innerHTML);
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
  const cleanCartListButton = document.querySelector('.empty-cart');
  cleanCartListButton.addEventListener('click', () => {
// Lógica da repetição while vista em https://stackoverflow.com/questions/43317676/javascript-error-uncaught-typeerror-failed-to-execute-removechild-on-node
    while (cartItems.firstChild) {
      cartItems.removeChild(cartItems.firstChild);
    }
    totalPrice = 0;
    total.innerText = `${totalPrice}`;
    saveCartItems([]);
  });
}

function getStorageItems() {
  const items = getSavedCartItems();
  cartItems.innerHTML = items;
  Array.from(cartItems.children).forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
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
  getStorageItems();
  cleanCartList();
};
