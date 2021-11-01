const sectionItems = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const body = document.querySelector('body');

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
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
}

body.addEventListener('click', (event) => {
  if (event.target.classList.contains('cart__item')) {
    cartItemClickListener(event);
  }
});

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Referencia ao repositorio do Guilherme Augusto (linha 40 a 60)
// https://github.com/tryber/sd-016-a-project-shopping-cart/pull/2/commits/3f747f8a5d0dc448bf818c2a1664b7b5c251640d
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
};

body.addEventListener('click', (e) => {
  if (e.target.classList.contains('item__add')) {
    e.preventDefault();
    getProduct(e);
  }
});

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

// Referencias ao vídeo do Bê (Bernardo Salgueiro)
async function searchProduct(product) {
  const searchResponse = await fetchProducts(product);
  searchResponse.results.forEach((item) => {
    const { id: sku, title: name, thumbnail: image } = item;

    sectionItems.appendChild(createProductItemElement({ sku, name, image }));
  });
}

window.onload = () => {
  searchProduct('computador');
  cartItems.innerHTML = getSavedCartItems();
};
