const ol = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const emptyCart = document.querySelector('.empty-cart');

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

function calcTotalPrice() {
  let total = 0;
  for (let index = 0; index < ol.children.length; index += 1) {
    const child = ol.children[index];
    const itemPrice = child.innerText.split('PRICE: $')[1];
    total += Number(itemPrice);
  }
  totalPrice.innerHTML = total;
}

function cartItemClickListener(event) {
  const item = event.target;
  item.remove();
  calcTotalPrice();
  saveCartItems(ol.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  saveCartItems(ol.innerHTML);
  return li;
}

async function selectProduct(product) {
  const selectedData = await fetchItem(product);

  const itemSelected = {
    sku: selectedData.id,
    name: selectedData.title,
    salePrice: selectedData.price,
  };

  const selectedItem = createCartItemElement(itemSelected);
  ol.appendChild(selectedItem);
  calcTotalPrice();
  saveCartItems(ol.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  const title = createCustomElement('span', 'item__title', name);
  const img = createProductImageElement(image);
  const id = createCustomElement('span', 'item__sku', sku);
  section.className = 'item';

  section.appendChild(id);
  section.appendChild(title);
  section.appendChild(img);
  section.appendChild(btn);
  btn.addEventListener('click', function () {
    selectProduct(id.innerText);
  });
  return section;
}

function addLoadingElement() {
  const element = document.createElement('h2');
  element.innerHTML = 'carregando';
  element.classList.add('loading');
  document.body.appendChild(element);
}

function removeLoadingElement() {
  const element = document.querySelector('.loading');
  element.remove();
}

async function searchProducts(product) {
  addLoadingElement();
  const searchData = await fetchProducts(product);
  removeLoadingElement();
  const sectionItem = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };

    const productItem = createProductItemElement(itemObject);
    sectionItem.appendChild(productItem);
  });
}

function clearCart() {
  ol.innerHTML = '';
  totalPrice.innerHTML = 0;
  saveCartItems(ol.innerHTML);
}
emptyCart.addEventListener('click', clearCart);

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = () => {
  searchProducts('computador');
  ol.innerHTML = getSavedCartItems();
  calcTotalPrice();
  for (let index = 0; index < ol.children.length; index += 1) {
    const child = ol.children[index];
    child.addEventListener('click', cartItemClickListener);
  }
};
