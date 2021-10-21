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

function createProductItemElement({ id, title, thumbnail }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const loadsProductsList = async () => {
  const data = await fetchProducts('computador');
  const { results } = data;
  const sectionWithAllProducts = document.querySelector('.items');
  results.forEach((result) => sectionWithAllProducts.appendChild(createProductItemElement(result)));
};

loadsProductsList();

 function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(element) {
  element.parentNode.removeChild(element);
  delCartItems(element.id);
}

 document.addEventListener('click', (event) => {
  if (event.target.classList.contains('cart__item')) {
    cartItemClickListener(event.target);
  }
});

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = `${id}`;
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  return li;
}

const itemToCart = async (item) => {
  const data = await fetchItem(item);
  const cartContainer = document.querySelector('.cart__items');
  cartContainer.appendChild(createCartItemElement(data));
};

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('item__add')) {
    const item = event.target.parentNode.firstChild;
    itemToCart(item.innerText);
    saveCartItems(item.innerText);
  }
});

// localStorage.clear();

window.onload = () => {
  // https://stackoverflow.com/questions/41271092/how-to-loop-through-localstorage-values/41271203
  const items = getSavedCartItems();
  console.log(items);
  if (items.length === 0) {
    return 1;
  }
  items.split(',').forEach((item) => itemToCart(item));
};