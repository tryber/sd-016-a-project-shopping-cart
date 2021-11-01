const list = document.querySelector('.cart__items');
const waitingSection = document.getElementById('waiting__api');

function updateTotal() {
  const cartItems = getSavedCartItems();
  let price = 0;
  cartItems.forEach((item) => {
    price += item.salePrice;
  });
  const total = document.querySelector('.total-price');
  total.innerHTML = price;
}

class Cart {
  cartItemClickListener(i) {
    const savedItems = getSavedCartItems();
    saveCartItems(savedItems.filter((item, index) => i !== index));
    this.updateCartItems();
  }
  
  createCartItemElement({ sku, name, salePrice }, i) {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
    li.addEventListener('click', () => this.cartItemClickListener(i));
    return li;
  }
  
  updateCartItems() {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    getSavedCartItems().forEach( 
      (savedItem, i) => list.appendChild(this.createCartItemElement(savedItem, i)),
    );
    updateTotal();
  }
} 

const cart = new Cart();

async function sendItemToCart(i) {
  const item = await fetchItem(i);
  const { id, title, price } = item;
  const element = { sku: id, name: title, salePrice: price };
  const cartItems = getSavedCartItems();
  saveCartItems([...cartItems, element]);
  cart.updateCartItems();
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

function loadingMessage() {
  const p = document.createElement('p');
  p.className = 'loading';
  p.innerText = 'carregando...';
  waitingSection.appendChild(p);
  console.log(waitingSection);
}

function removeLoadingMessage() {
  waitingSection.removeChild(waitingSection.firstChild);
  console.log(waitingSection);
}

async function getProducts(product) {
  loadingMessage();
  const productSearch = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  productSearch.results.forEach((computer) => {
    const eachComputer = {
    sku: computer.id, name: computer.title, image: computer.thumbnail };
    const appendProduct = createProductItemElement(eachComputer);
    sectionItems.appendChild(appendProduct);
  });
  removeLoadingMessage();
}

function clearOnClick() {
  saveCartItems([]);
  cart.updateCartItems();
}

function createCleanButton() {
  const parent = document.querySelector('.cart');
  const button = document.createElement('button');
  button.className = 'empty-cart';
  button.innerHTML = 'Esvaziar carrinho';
  button.addEventListener('click', clearOnClick);
  parent.appendChild(button);
  return button;
}

window.onload = () => {
  getProducts('computador');
  createCleanButton();
  cart.updateCartItems();
};
