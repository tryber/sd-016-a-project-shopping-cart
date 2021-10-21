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
  const eventli = event;
  eventli.target.remove();
}

function sumItems(salePrice) {
  const price = document.querySelector('.total-price');
  price.innerText = (parseFloat(price.innerText) + salePrice).toFixed(2);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  sumItems(salePrice);
  return li;
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

window.onload = () => { 
  appendProducts();
  setTimeout(appendItemToCart, 500);
};
