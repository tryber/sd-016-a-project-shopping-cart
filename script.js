const totalPrice = document.querySelector('.total-price');

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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  totalPrice.innerText = (parseFloat(totalPrice.innerText) * 100 + salePrice * 100) / 100;
  li.addEventListener('click', cartItemClickListener);
  li.addEventListener('click', () => {
    totalPrice.innerText = (parseFloat(totalPrice.innerText) * 100 - salePrice * 100) / 100;
  });
  return li;
}
function removeAllItems() {
  const buttonRemoveAll = document.querySelector('.empty-cart');
  buttonRemoveAll.addEventListener('click', () => {
    const ol = document.querySelector('.cart__items');
    ol.innerHTML = '';
    totalPrice.innerText = 0;
  });
}

async function priceCartItem(id) {
  const getCartItems = document.querySelector('.cart__items');
  const data = await fetchItem(id);
  getCartItems.appendChild(createCartItemElement(data));
}
function appendItemToCart() {
  const getButton = document.querySelectorAll('.item__add');
  getButton.forEach((element) => {
    element.addEventListener('click', (event) => {
      const item = event.target.parentNode.firstChild;
      priceCartItem(item.innerText);
    });
  });
}
function appendProducts() {
  const section = document.querySelector('.items');
  fetchProducts('computador')
  .then((data) => {
    data.results.forEach((product) => {
      const { id, title, thumbnail } = product;
      section.appendChild(createProductItemElement({ id, title, thumbnail }));
    });
  });
}
window.onload = () => { 
  appendProducts();
  setTimeout(appendItemToCart, 60);
  removeAllItems();
};
