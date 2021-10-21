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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  // console.log(item);
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const loadProducts = async () => {
  const getItems = document.querySelector('.items');
  const array = await fetchProducts('computador');
  array.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    getItems.appendChild(createProductItemElement({ sku, name, image }));
  }); 
};

const addToCart = async (event) => {
  const cart = document.querySelector('ol');
  const idProduct = getSkuFromProductItem(event.path[1]);
  const item = await fetchItem(idProduct);
  const { id: sku, title: name, price: salePrice } = item;
  cart.appendChild(createCartItemElement({ sku, name, salePrice }));
};

const setupAddToCart = () => {
  const buttonCart = document.querySelectorAll('.item__add');
  buttonCart.forEach((buttonAdd) => {
    buttonAdd.addEventListener('click', addToCart);
  });
};

window.onload = async () => { 
  await loadProducts(); 
  setupAddToCart();
};