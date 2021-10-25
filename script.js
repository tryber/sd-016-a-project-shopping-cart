const body = document.querySelector('body');
const items = document.querySelector('section .items');
const cartItems = document.querySelector('section .cart__items');
const totalPrice = document.querySelector('.sub-total .total-price');
const emptyCardButton = document.querySelector('.empty-cart');
const loadingMessage = document.querySelector('.loading');
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');
const cartPictures = document.querySelector('.cart__pictures');

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

function createProductText({ sku, name, salePrice }) {
  const div = document.createElement('div');
  const nameP = document.createElement('p');
  const priceP = document.createElement('p');
  const prePrice = document.createElement('p');
  const skuP = document.createElement('p');
  div.className = 'cart__text';
  nameP.className = 'cart-item-name';
  priceP.className = 'cart-item-price';
  skuP.className = 'cart-item-no-display';
  prePrice.className = 'cart-item-no-display';
  skuP.innerText = `SKU: ${sku} | NAME: `;
  nameP.innerText = name;
  prePrice.innerText = ' | PRICE: ';
  priceP.innerText = `$${salePrice}`;

  const elements = [skuP, nameP, prePrice, priceP];
  elements.forEach((element) => div.appendChild(element));
  return div;
}

function createCartItemElement({ sku, name, salePrice, image }) {
  const li = document.createElement('li');
  const img = document.createElement('img');
  const text = createProductText({ sku, name, salePrice });
  
  img.className = 'cart__image';
  img.src = image;

  li.className = 'cart__item';
  li.appendChild(img);
  li.appendChild(text);
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
  const allPrices = document.querySelectorAll('.cart-item-price');
  if (allPrices.length === 0) {
    totalPrice.innerText = 0;
    totalPrice.parentElement.style.display = 'none';
  } else {
    totalPrice.parentElement.style.display = 'block';
    const prices = [];
    allPrices.forEach((price) => {
      const fullPriceText = price.innerText;
      const noDollarSign = fullPriceText.replace(/\$/g, '');
      const priceValue = noDollarSign.replace(/R /g, '');
      prices.push(parseFloat(priceValue));
    });
    const total = prices.reduce((acc, price) => acc + price);
    totalPrice.innerText = total;
  }
};

const addToCart = (foundProduct) => {
  const { id: sku, title: name, price: salePrice, thumbnail: image } = foundProduct;
  const product = { sku, name, salePrice, image };
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

  if (!product.classList.contains('cart__item')) {
    const parent = product.parentElement;
    if (product.classList.contains('cart__image')) {
      cartItems.removeChild(parent);
    } else {
      const grandParent = parent.parentElement;
      cartItems.removeChild(grandParent);
    }
  } else {
    cartItems.removeChild(product);
  }

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

const removeAllItems = () => {
  items.innerHTML = '';
  body.appendChild(loadingMessage);
};

const search = () => {
  const term = searchInput.value;
  removeAllItems();
  fetchProducts(term)
    .then((data) => {
      setProducts(data.results);
      body.removeChild(loadingMessage);
    });
  searchInput.value = '';
};

body.addEventListener('click', (e) => {
  if (e.target.classList.contains('item__add')) {
    e.preventDefault();
    getProduct(e);
  }
});

body.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart__item')
      || e.target.classList.contains('cart__image')
      || e.target.classList.contains('cart-item-name')
      || e.target.classList.contains('cart-item-price')) {
    e.preventDefault();
    removeFromCart(e);
  }
});

searchButton.addEventListener('click', search);
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    search();
  }
});

emptyCardButton.addEventListener('click', emptyCard);

window.onload = () => { 
  setSavedCart();
  updateTotalPrice();
};
