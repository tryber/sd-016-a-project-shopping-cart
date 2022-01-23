const loading = document.querySelector('.loading');
const cartOl = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function totalPrice() {
  const arrayAllItems = cartOl.childNodes;
  const itemValues = [];
  arrayAllItems.forEach((item) => {
    const itemPrice = item.innerHTML.split('PRICE: $');
    itemValues.push(Number(itemPrice[1]));
  });
  return itemValues;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function setCartPrice() {
  const totalToPay = document.querySelector('.total-price');
  totalToPay.innerHTML = totalPrice().reduce((acc, current) => acc + current, 0);
}
setCartPrice();

function cartItemClickListener(event) {
  setCartPrice();
  event.target.remove();
}

cartOl.addEventListener('click', cartItemClickListener);

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  cartOl.appendChild(li);
}

async function addItemToCart(sku) {
  const allItens = await fetchItem(sku);
  const { title: name, price: salePrice, thumbnail: image } = allItens;
  createCartItemElement({ sku, image, name, salePrice });
  saveCartItems(cartOl.innerHTML);
  setCartPrice();
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  const productSection = document.querySelector('.items');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(addButton);
  productSection.appendChild(section);
  addButton.addEventListener('click', () => {
    saveCartItems(cartOl.innerHTML);
    addItemToCart(sku);
  });
}

const allProducts = () => {
  fetchProducts('computador').then((response) => {
    response.results.forEach((products) => createProductItemElement(products));
    loading.remove();
  });
};

const setSavedCart = () => {
  const memory = getSavedCartItems();
  cartOl.innerHTML = memory;
};
const clearAllCart = document.querySelector('.empty-cart');
clearAllCart.addEventListener('click', () => {
  const allItems = document.querySelector('.cart__items');
  allItems.innerHTML = '';
  setCartPrice();
  saveCartItems(cartOl.innerHTML);
});

window.onload = async () => {
  allProducts();
  setSavedCart();
  setCartPrice();
};