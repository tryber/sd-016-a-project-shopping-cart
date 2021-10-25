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
  const cartUlItem = document.querySelector('.cart__item');
  cartUlItem.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const catchSection = document.querySelector('.items');
    searchData.results.forEach((listItem) => {
      const { id: sku, title: name, thumbnail: image } = listItem;
      const productItem = createProductItemElement({ sku, name, image });
      catchSection.appendChild(productItem);
    });
}

async function addToCart(product) {
  const searchCartItem = await fetchItem(product);
  const catchSection = document.querySelector('.cart__items');
      const { id: sku, title: name, price: salePrice } = searchCartItem;
      const cartItem = createCartItemElement({ sku, name, salePrice });
      catchSection.appendChild(cartItem);
}

window.onload = () => {
  searchProducts('computador');
  addToCart('MLB1341706310');
};
