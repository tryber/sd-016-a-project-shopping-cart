const productConteiner = document.querySelector('.items');
const buttonList = document.getElementsByClassName('item__add');
const cartConteiner = document.querySelector('.cart__items');

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
  if(element === 'button'){
      e.addEventListener('click', addToCart)
  }
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
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getProductData() {
  const arrayOfProducts = fetchProducts('computador');
  arrayOfProducts.then((productList) => {
    productList.results.forEach((product) => {
      const sku = product.id;
      const name = product.title;
      const image = product.thumbnail;
      productConteiner.appendChild(
        createProductItemElement({ sku, name, image }),
      );
    });
  });
}

function addToCart(event) {
  const buttonHTML = event.target;
  const product = buttonHTML.parentNode
  const productId = getSkuFromProductItem(product);
  const itemObj = fetchItem(productId);
  itemObj.then((object)=>{
    const sku = object.id;
    const name = object.title;
    const salePrice = object.price;
    cartConteiner.appendChild(
      createCartItemElement({ sku, name, salePrice }),
    );
  });
}

window.onload = () => {
  getProductData();
};
