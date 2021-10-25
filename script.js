function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function updatePrice(price, operation) {
  const priceEl = document.getElementsByClassName('total-price')[0];
  const prevPrice = parseInt(priceEl.innerText, 10);
  let total = 0;
  if (operation === 'add') {
    total = prevPrice + price;
  } else total = prevPrice - price;
  priceEl.innerText = total;
  localStorage.setItem('price', total);
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const element = event.target;
  const price = element.classList[1];
  element.remove();
  updatePrice(price, 'remove');
  const items = document.getElementsByClassName('cart__items')[0];
  saveCartItems(items.outerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = `cart__item ${salePrice}`;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  updatePrice(salePrice, 'add');
  return li;
}

async function handleClick(event) {
  const sku = event.target.id;
  const itemInfo = await fetchItem(sku);

  const { title: name, price: salePrice } = itemInfo;
  const cartElement = createCartItemElement({ sku, name, salePrice });
  const cartList = document.getElementsByClassName('cart__items')[0];
  cartList.appendChild(cartElement);
  saveCartItems(cartList.outerHTML);
}

function createCustomElement(element, className, innerText, id) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', handleClick);
    e.id = id;
  }
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', sku));

  return section;
}

function createProductList(data) {
  const items = document.getElementsByClassName('items')[0];
  const products = data.results;

  products.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const productElement = createProductItemElement({ sku, name, image });
    items.appendChild(productElement);
  });
}

function loadListners() {
  const cartItems = document.getElementsByClassName('cart__item');
  for (let index = 0; index < cartItems.length; index += 1) {
    const item = cartItems[index];
    item.addEventListener('click', cartItemClickListener);
  }
}

function clearCart() {
  const price = localStorage.getItem('price');
  const list = document.getElementsByClassName('cart__items')[0];
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  localStorage.removeItem('cartItems');
  updatePrice(price, 'remove');
}
const button = document.getElementsByClassName('empty-cart')[0];
button.addEventListener('click', clearCart);

window.onload = async () => {
  const products = await fetchProducts('computador');
  createProductList(products);
  if (localStorage.getItem('cartItems') !== null) {
    getSavedCartItems();
    loadListners();
    const price = parseInt(localStorage.getItem('price'), 10);
    updatePrice(price, 'add');
  }
};
