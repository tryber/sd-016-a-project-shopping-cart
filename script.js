const $body = document.body;
const cartItems = document.querySelector('.cart__items');
const clearButton = document.querySelector('.empty-cart');

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
  event.target.parentNode.removeChild(event.target);
  saveCartItems(cartItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function productCardClickListener(event) {
  const elementParent = event.target.parentElement;
  console.log(elementParent);

  const sku = getSkuFromProductItem(elementParent);
  fetchItem(sku).then((item) => {
    const formatedItemObj = { sku: item.id, name: item.title, salePrice: item.price };
    cartItems.appendChild(createCartItemElement(formatedItemObj));
    saveCartItems(cartItems.innerHTML);
    // return formatedItemObj;
   });
  //  name = getNameFromProductItem(elementParent);
  // const elementObj = { sku, name, salePrice: 555 };
}

 function addProductsOnScreen() {
  fetchProducts('computadores')
  // .then((producList) => console.log(producList));
  .then((productData) => productData.results)
  .then((productList) => {
   const items = document.querySelector('.items');
   const productMapObj = productList.map((product) => {
     const formatedObj = { sku: product.id, name: product.title, image: product.thumbnail };
     return formatedObj;
   });
   productMapObj.forEach((product) => {
    const productElement = createProductItemElement(product);
    const buttonElement = productElement.querySelector('button');
    buttonElement.addEventListener('click', productCardClickListener);
    // const sku = getSkuFromProductItem(productElement);
    items.appendChild(productElement);
   });
  });
}

function restoreCartItems() {
  cartItems.innerHTML = getSavedCartItems();
  Array.from(cartItems.children).forEach((element) => element
  .addEventListener('click', cartItemClickListener));
}

window.onload = () => {
  addProductsOnScreen();
  restoreCartItems();
 };

function clearCartList() {
  cartItems.innerHTML = '';
  saveCartItems(cartItems.innerHTML);
}

 clearButton.addEventListener('click', clearCartList);