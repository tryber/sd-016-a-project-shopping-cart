const body = document.querySelector('body');
const items = document.querySelector('section .items');
const cartItems = document.querySelector('section .cart__items');

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
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
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
    const { id: sku, title: name, thumbnail: image } = product;
    const infos = {
      sku,
      name,
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
  });

const addToCart = (foundProduct) => {
  const { id: sku, title: name, price: salePrice } = foundProduct;
  const product = { sku, name, salePrice };
  const item = createCartItemElement(product);
  cartItems.appendChild(item);
};

const getProduct = async (e) => {
  const product = e.target.parentElement;
  const productId = product.firstChild.innerText;
  const findProduct = await fetchItem(productId);
  addToCart(findProduct);
};

const removeFromCart = (e) => {
  const product = e.target;
  cartItems.removeChild(product);
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

window.onload = () => { };
