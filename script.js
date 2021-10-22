const $body = document.body;
const cartItems = document.querySelector('.cart__items');

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

function getNameFromProductItem(item) {
  return item.querySelector('span.item__title').innerText;
}

function cartItemClickListener(event) {
  // console.log(event.target);
  // console.log(getSkuFromProductItem(event.target));
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

  // fetchItem('MLB1341706310').then((item) => {
  //   const formatedItemObj = { sku: item.id, name: item.title, salePrice: item.price };
  //   return formatedItemObj;
  //  });

// $body.addEventListener('click', (element) => {
//   const clickedElementImage = element.path[0].previousElementSibling;
//   const clickedElementText = clickedElementImage.previousElementSibling;
//   console.log(clickedElementImage, clickedElementText);
//   // cartItems.appendNewChild(clickedElementText);
//   // cartItems.appendNewChild(clickedElementImage);
// });

window.onload = () => {
  addProductsOnScreen();
 };