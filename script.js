const getCartItems = () => document.querySelector('.cart__items');

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

function updateCart() {
  const cartItems = document.querySelectorAll('.cart__item');
  const totalPrice = document.querySelector('.total-price');
  let allProductsPrice = 0;

  cartItems.forEach((cartItem) => {
    const cartItemSplit = cartItem.innerText.split('|');
    const productPrice = cartItemSplit[2].split('$')[1];
    allProductsPrice += Number(productPrice);
  });

  totalPrice.innerText = allProductsPrice;
}

function cartItemClickListener({ target }) {
  target.remove();
  const cartItems = getCartItems();
  saveCartItems('cartItems', cartItems.outerHTML);
  updateCart();
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
  const cartItems = getCartItems();
  cartItems.appendChild(itemElement);
  saveCartItems('cartItems', cartItems.outerHTML);
  updateCart();
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

function loadCartOnLocalStorage() {
  const savedCartItems = getSavedCartItems();
  if (!savedCartItems) return;
  const cartSection = document.querySelector('.cart');
  const cartItems = getCartItems();
  cartItems.remove();
  cartSection.innerHTML += savedCartItems;
  const newCardItems = document.querySelector('.cart__items');
  newCardItems.childNodes.forEach((children) => {
    children.addEventListener('click', cartItemClickListener);
  });
  updateCart();
}

window.onload = () => {
  searchingProductsAndAddToList();
  loadCartOnLocalStorage();
};
