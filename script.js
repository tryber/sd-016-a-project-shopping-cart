const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const itemsOfCart = [];

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
  cartItems.removeChild(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function sendToCart(sku) {
  const { title: name, price: salePrice } = await fetchItem(sku);
  cartItems.appendChild(createCartItemElement({ sku, name, salePrice }));
  itemsOfCart.push({ sku, name, salePrice });
  saveCartItems(JSON.stringify(itemsOfCart));
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const btnToAdd = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btnToAdd.addEventListener('click', () => sendToCart(sku));
  section.appendChild(btnToAdd);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const showItems = async () => {
  const list = await fetchProducts('computador');
  list.results.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    items.appendChild(createProductItemElement({ sku, name, image }));
  });
};

window.onload = () => {
  showItems();
  if (getSavedCartItems() === undefined) {
    return;
  }
  const savedInStorage = getSavedCartItems();

  JSON.parse(savedInStorage).forEach((item) => {
    const { sku, name, salePrice } = item;
    cartItems.appendChild(
      createCartItemElement({ sku, name, salePrice }),
    );
  });
};
