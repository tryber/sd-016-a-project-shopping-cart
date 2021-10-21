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
  // coloque seu código aqui
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addingItemToCart(skuTarget) {
  const item = await fetchItem(skuTarget);
  const itemElement = createCartItemElement(item);
  const cartItems = document.querySelector('.cart__items');
  cartItems.appendChild(itemElement);
}

function listenerToAllButtonsOfProducts() {
  const allButtons = document.querySelectorAll('.item__add');

  allButtons.forEach((button) => {
    button.addEventListener('click', ({ target }) => {
      const skuTarget = getSkuFromProductItem(target.parentNode);
      addingItemToCart(skuTarget);
    });
  });
}

function searchingProductsAndAddToList() {
  fetchProducts('computador')
    .then((data) => {
      const { results } = data;
      const listItems = document.querySelector('.items');
      results.forEach((product) => {
        const productElement = createProductItemElement(product);
        listItems.appendChild(productElement);
      });
      listenerToAllButtonsOfProducts();
    });
}

window.onload = () => {
  searchingProductsAndAddToList();
};
