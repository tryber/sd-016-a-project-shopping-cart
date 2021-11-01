const ol = document.querySelector('.cart__items');

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

function counter() {
  const totalPrice = document.querySelector('.total-price');
  const restoreLocalStorage = getSavedCartItems();
  if (ol.children.length) {
    const arrLocalStorage = restoreLocalStorage.split('PRICE: $');
    arrLocalStorage.shift();
    const arr = arrLocalStorage.reduce((acc, curr) => {
      acc.push(Number(curr.substring(0, curr.indexOf('<'))));
      return acc;
    }, []);
    const result = arr.reduce((acc, curr) => acc + curr);
    totalPrice.innerText = result;
    return 1;
  }
  totalPrice.innerText = 0;
}

function saveLocalStorage() {
  saveCartItems(ol.innerHTML);
  counter();
}

function cartItemClickListener(event) {
  event.target.remove();
  saveLocalStorage();
}

function restoreCartItems() {
  const cartItems = getSavedCartItems();
  ol.innerHTML = cartItems;
  ol.addEventListener('click', cartItemClickListener);
}

function createCartItemElement({
  sku,
  name,
  salePrice,
}) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  ol.appendChild(li);
  saveLocalStorage();
  counter();
}

async function searchitem(itemId) {
  const searchData = await fetchItem(itemId);
  const {
    id: sku,
    title: name,
    price: salePrice,
  } = searchData;
  createCartItemElement({
    sku,
    name,
    salePrice,
  });
}

function createProductItemElement({
  sku,
  name,
  image,
}) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const elements = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  elements.addEventListener('click', () => searchitem(sku));
  section.appendChild(elements);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

window.onload = () => {
  searchProducts('computador');
  restoreCartItems();
  counter();
};
