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
  // coloque seu código aqui
  event.target.remove();
  saveCartItems(olListCart.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const olListCart = document.querySelector('.cart__items');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  olListCart.appendChild(li);
  saveCartItems(olListCart.innerHTML);
}

const addCartItem = async (sku) => {
  const fetch = await fetchItem(sku);
  console.log(fetch);
  const { title: name, price: salePrice } = fetch;
  createCartItemElement({ sku, name, salePrice });
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  const sectionElement = document.querySelector('.items');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const createButtonEvent = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  createButtonEvent.addEventListener('click', () => {
    addCartItem(sku);
  });
  section.appendChild(createButtonEvent);
  sectionElement.appendChild(section);
}

const fetchProductsReturn = () => fetchProducts('computador').then((value) => {
    value.results.forEach((product) => {
      createProductItemElement(product);
    });
  });

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = () => {
  fetchProductsReturn();
};