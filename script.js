const getContainer = () => document.querySelector('.cart__items');

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

function cartItemClickListener(element) {
  element.parentNode.removeChild(element);
  const cartContainer = getContainer();
  saveCartItems(cartContainer.innerHTML);
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
  const cartContainer = getContainer();
  cartContainer.appendChild(createCartItemElement(data));
};

document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('item__add')) {
    const item = event.target.parentNode.firstChild;
    await itemToCart(item.innerText);
    const cartContainer = getContainer();
    saveCartItems(cartContainer.innerHTML);
  }
});

// localStorage.clear();

window.onload = () => {
  const items = getSavedCartItems();
  const cartContainer = getContainer();
  cartContainer.innerHTML = items;
};