const getItems = document.querySelector('section .items');
const body = document.querySelector('body');
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

const getProducts = (products) => {
  products.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const infos = {
      sku,
      name,
      image,
    };
    const item = createProductItemElement(infos);
    getItems.appendChild(item);
  });
};

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

body.addEventListener('click', (e) => {
  if (e.target.classList.contains('item__add')) {
    e.preventDefault();
    getProduct(e);
  }
});

window.onload = () => {
  fetchProducts('computador').then((res) => {
    getProducts(res.results);
  });
};
