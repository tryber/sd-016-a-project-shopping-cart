const olItems = document.querySelector('.cart__items');
const emptyCart = document.querySelector('.empty-cart');
const totalPrice = document.querySelector('.total-price');
const loading = document.querySelector('.loading');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const getPrices = () => {
  const allItems = olItems.childNodes;
  const arrayValue = [];
  allItems.forEach((item) => {
    const price = item.innerHTML.split('PRICE: $');
    arrayValue.push(parseFloat(price[1]));
  });
  return arrayValue;
};

const setCartPrice = () => {
  totalPrice.innerHTML = getPrices().reduce((acc, crr) => acc + crr, 0); 
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  event.target.remove();  
  setCartPrice();
  saveCartItems(olItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener); // pegar essa linha
  
  return li;
}

const addItemToCart = async (item) => {
  const data = await fetchItem(item);
  const { id: sku, title: name, price: salePrice } = data;
  const itemCart = createCartItemElement({ sku, name, salePrice });
  olItems.appendChild(itemCart);
  setCartPrice();
  saveCartItems(olItems.innerHTML);
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonAdd = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(buttonAdd);
  buttonAdd.addEventListener('click', () => addItemToCart(sku));
  loading.remove();
  
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// help from teacher Bernardo!
const serchProducts = async (product) => {
  const data = await fetchProducts(product);
  const section = document.querySelector('.items');
  data.results.forEach((item) => {
    const { id: sku, title: name, thumbnail: image } = item;
    const productItem = createProductItemElement({ sku, name, image });
    section.appendChild(productItem);
  });
};

const saveCart = () => {
  olItems.innerHTML = getSavedCartItems();
  const li = document.querySelectorAll('.cart__item');
  li.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
  // li.addEventListener('click', cartItemClickListener); // help instructor Caique!
};

emptyCart.addEventListener('click', () => {
  olItems.innerHTML = '';
  saveCartItems(olItems.innerHTML);
  totalPrice.innerHTML = 0;
});

window.onload = () => {
  serchProducts('computador');
  // addItemToCart('MLB1615760527');
  saveCart();
};
