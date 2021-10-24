function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
const total = document.querySelector('#price');
const totalPrice = document.querySelector('.total-price');
const olItems = document.querySelector('.cart__items');
let sum = 0;

function ClearAllItemsOfCart() {
  const btnClear = document.querySelector('.empty-cart');
  btnClear.addEventListener('click', () => {
    olItems.innerHTML = '';
  });
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

function calculatePriceOfCart(addPrice, removePrice) {
  if (addPrice === 0) {
    sum -= removePrice; 
  } else {
    sum += addPrice;
  }
  const result = Math.abs(sum);
  if (sum === 0) total.remove();
  total.innerText = `${result}`;
}

function extractPriceCart(item) {
  const separatePrice = item.innerText.split(' ');
  const lastPositionOfArray = separatePrice.length - 1;
  const priceString = separatePrice[lastPositionOfArray].slice(1);
  const price = Number(priceString);
  return price;
}

function cartItemClickListener(event) {
 const li = event.target;
 calculatePriceOfCart(0, extractPriceCart(li));
 li.remove();
 saveCartItems(olItems.innerHTML, totalPrice.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function createItemsCart(id) {
  const requestData = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = requestData;
  const liItems = createCartItemElement({ sku, name, salePrice });
  calculatePriceOfCart(salePrice, 0);
  olItems.appendChild(liItems);
  saveCartItems(olItems.innerHTML, totalPrice.innerHTML);
}

function listenerAdd() {
  const getButtonAddToCart = document.querySelectorAll('.item__add');
  getButtonAddToCart.forEach((elementBTN, index) => {
    elementBTN.addEventListener('click', () => {
      const itemSKU = getButtonAddToCart[index].parentNode.firstElementChild.innerText;
      createItemsCart(itemSKU);
  });
  });
}

async function currentProducts(product) {
  const sectionItems = document.querySelector('.items');
  const listProducts = await fetchProducts(product);
  listProducts.results.forEach((objectProduct) => {
    const itemProduct = {
      sku: objectProduct.id,
      name: objectProduct.title,
      image: objectProduct.thumbnail,
    };
    const sectionProductsItems = createProductItemElement(itemProduct);
    sectionItems.appendChild(sectionProductsItems);
  });
  listenerAdd();
}

window.onload = () => { 
  currentProducts('computador');
  getSavedCartItems(cartItemClickListener);
  ClearAllItemsOfCart();
};
