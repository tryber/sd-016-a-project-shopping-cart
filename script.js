const cartItemsQuerySelector = '.cart__items';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function sumItemPrice() {
  const cartItens = document.querySelectorAll(`${cartItemsQuerySelector} li`);
  console.log(cartItens);
  let total = 0;
  cartItens.forEach((item) => {
    const price = item.innerText.split('PRICE: $')[1];
    total += parseFloat(price);
  });
  total = Math.round(total * 100) / 100;
  return total;
}

function createTotalPrice() {
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerHTML = sumItemPrice();
}

function clearCart() {
  const cart = document.querySelector(cartItemsQuerySelector);
  cart.innerHTML = '';
  createTotalPrice();
  saveCartItems(cart);
}

function cartItemClickListener(event) {
  const cartItems = document.querySelector(cartItemsQuerySelector);
  cartItems.removeChild(event.target);
  saveCartItems(cartItems);
  createTotalPrice();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const createCartItems = async (itemId) => {
  try {
    const item = await fetchItem(itemId);
    console.log(item);
    const itemElement = createCartItemElement(item);
    const cartItem = document.querySelector(cartItemsQuerySelector);
    cartItem.appendChild(itemElement);
    saveCartItems(cartItem);
    createTotalPrice();
  } catch (error) {
    console.log(error);
  }
};

function addRemoveItem() {
  const allItems = document.querySelectorAll(`${cartItemsQuerySelector} li`);
  allItems.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
  console.log(allItems);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => {
    console.log('funcionou');
    createCartItems(sku);
  });
  section.appendChild(button);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function searchProducts(product) {
  const data = await fetchProducts(product);
  const section = document.querySelector('.items');
  data.results.forEach((item) => {
    const object = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(object);
    section.appendChild(productItem);
  });
}

window.onload = () => {
  searchProducts('computador');
  const list = document.querySelector(cartItemsQuerySelector);
  list.innerHTML = getSavedCartItems();
  addRemoveItem();
  createTotalPrice();
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', clearCart);
  console.log(button);
};
