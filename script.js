const cart = document.querySelector('.cart__items');
const value = document.querySelector('.total-price');
const loading = document.querySelector('.loading');

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
  section.appendChild(createCustomElement('span', 'item_title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const saveItems = () => saveCartItems(cart.innerHTML);

function totalValue() {
  const items = document.querySelectorAll('.cart__item');
  value.innerText = 0;
  items.forEach(async (item) => {
    const itemValue = await fetchItem(item.id);
    value.innerText = (parseFloat(value.innerText) + itemValue.price);
  });
}

function cartItemClickListener() {
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((cartItem) => {
    cartItem.addEventListener('click', () => {
      cartItem.remove();
      saveItems();
      totalValue();
    });
  });
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.id = sku;
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItemsOnScreen = async (productName) => {
  const product = await fetchProducts(productName);
  const listOfItems = document.querySelector('.items');
  product.results.forEach((result) => {
    const { id: sku, title: name, thumbnail: image } = result;
    listOfItems.appendChild(createProductItemElement({ sku, name, image }));
  });
  loading.remove();
};

const addItemOnCart = async (itemId) => {
  const item = await fetchItem(itemId);
  const { id: sku, title: name, price: salePrice } = item;
  cart.appendChild(createCartItemElement({ sku, name, salePrice }));
  value.innerText = (parseFloat(value.innerText) + salePrice).toFixed(2);
  cartItemClickListener();
  saveItems();
};

const loadCartItems = () => {
  cart.innerHTML = localStorage.getItem('cartItems');
  totalValue();
};

const addOnCartListeners = () => {
  const buttons = document.querySelectorAll('.item');
  buttons.forEach((item) => {
    item.addEventListener('click', () => addItemOnCart(getSkuFromProductItem(item)));
  });
};

const clearButton = document.querySelector('.empty-cart');
clearButton.addEventListener('click', () => {
  cart.innerHTML = '';
  value.innerText = 0;
  saveItems();
});

window.onload = () => {
  addItemsOnScreen('computador')
    .then(() => {
      loadCartItems();
      cartItemClickListener();
      addOnCartListeners();
    });
};
