const containerObj = [];
const cartItem = document.querySelector('.cart__items');

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

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  return li;
}

function addToCart(evt) {
  const { parentElement } = evt.target;
  const idFind = parentElement.childNodes[0].innerText;
  fetchItem(idFind).then((data) => {
    const { id: sku, title: name, price: salePrice } = data;
    const objResult = { sku, name, salePrice };
      cartItem.appendChild(createCartItemElement(objResult));
      containerObj.push(objResult);
      saveCartItems(JSON.stringify(containerObj));
  });
}

function removeToCart() {
  cartItem.addEventListener('click', (e) => {
   if (e.target) {
    e.target.remove();
  }
  });
}

function cartItemClickListener(event) {
  addToCart(event);
  removeToCart();
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  const { results } = searchData;
  results.forEach((item) => {
    const { id: sku, title: name, thumbnail: image } = item;
    const itemObject = { 
      sku,
      name,
      image,
    }; 
    const productItem = createProductItemElement(itemObject);
    const buttonEl = productItem.childNodes[3];
    buttonEl.addEventListener('click', cartItemClickListener);
    sectionItems.appendChild(productItem);
  });
}

const recoveryData = () => {
   const dataRecovery = JSON.parse(getSavedCartItems());
   dataRecovery.forEach((product) => cartItem.appendChild(createCartItemElement(product)));
};
window.onload = () => { 
  searchProducts('computador');
  recoveryData();
};