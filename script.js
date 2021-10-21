const body = document.querySelector('body');
const items = document.querySelector('section .items');
const cartItems = document.querySelector('section .cart__items');
const totalPrice = document.querySelector('.sub-total .total-price');
const emptyCardButton = document.querySelector('.empty-cart');
const loadingMessage = document.querySelector('.loading');

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

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const setHigherQualityImages = () => {
  const allItems = document.querySelectorAll('.items .item');
  allItems.forEach((item) => {
    const image = item.children[2];
    const replaceSrc = image.src.replace(/I.jpg/g, 'W.jpg');
    image.src = replaceSrc;
  });
};

const setProducts = (products) => {
  products.forEach((product) => {
    const { id: sku, title: name, price, thumbnail: image } = product;
    const infos = {
      sku,
      name,
      price,
      image,
    };
    const item = createProductItemElement(infos);
    items.appendChild(item);
  });
  setHigherQualityImages();
};

fetchProducts('computador')
  .then((data) => {
    setProducts(data.results);
    body.removeChild(loadingMessage);
  });

const updateTotalPrice = () => {
  const allCartItems = cartItems.childNodes;
  if (allCartItems.length === 0) {
    totalPrice.innerText = 0;
    totalPrice.parentElement.style.display = 'none';
  } else {
    totalPrice.parentElement.style.display = 'block';
    const prices = [];
    allCartItems.forEach((item) => {
      const productText = item.innerText;
      const pricePosition = productText.search(/PRICE/i);
      const priceText = productText.substring(pricePosition, productText.length);
      const price = parseFloat(priceText.match(/\d+/g).join('.'));
      prices.push(price);
    });
    const total = prices.reduce((acc, price) => acc + price);
    totalPrice.innerText = total;
  }
};

const addToCart = (foundProduct) => {
  const { id: sku, title: name, price: salePrice } = foundProduct;
  const product = { sku, name, salePrice };
  const item = createCartItemElement(product);
  cartItems.appendChild(item);
  saveCartItems(cartItems.innerHTML);
};

const getProduct = async (e) => {
  const product = e.target.parentElement;
  const productId = product.firstChild.innerText;
  const findProduct = await fetchItem(productId);

  addToCart(findProduct);
  updateTotalPrice();
};

const removeFromCart = (e) => {
  const product = e.target;
  cartItems.removeChild(product);

  saveCartItems(cartItems.innerHTML);
  updateTotalPrice();
};

const setSavedCart = () => {
  const inner = getSavedCartItems();
  cartItems.innerHTML = inner;
};

const emptyCard = () => {
  cartItems.innerHTML = '';
  saveCartItems('');
  updateTotalPrice();
};

body.addEventListener('click', (e) => {
  if (e.target.classList.contains('item__add')) {
    e.preventDefault();
    getProduct(e);
  }
});

body.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart__item')) {
    e.preventDefault();
    removeFromCart(e);
  }
});

emptyCardButton.addEventListener('click', emptyCard);

window.onload = () => { 
  setSavedCart();
  updateTotalPrice();
};
