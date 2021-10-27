const cartItemsList = document.querySelector('.cart__items');

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

function updateTotalPriceElement() {
  const totalPriceElement = document.querySelector('.total-price').firstChild;
  let totalPrice = localStorage.getItem('totalPrice');
  const totalPriceNumber = parseFloat(totalPrice);
  if (totalPrice.includes('.00')) {
    totalPrice = totalPriceNumber.toFixed(0);
    totalPrice = totalPrice.toString();
  } else if (totalPrice.includes('.') && totalPrice.endsWith('0')) {
      totalPrice = totalPriceNumber.toFixed(1);
      totalPrice = totalPrice.toString();
  }
  totalPriceElement.innerText = totalPrice;
}

async function getSelectedItemInfo(selectedItem) {
  const itemCard = selectedItem.parentElement;
  const itemId = getSkuFromProductItem(itemCard);
  const acquiredData = await fetchItem(itemId);
  return acquiredData;
}

function updateCartList(newItem) {
  cartItemsList.appendChild(newItem);
  saveCartItems(cartItemsList.innerHTML);
}

function updateTotalPrice(salePrice) {
  const currentPrice = parseFloat(localStorage.getItem('totalPrice'));
  let summedPrice = salePrice + currentPrice;
  summedPrice = summedPrice.toFixed(2);
  localStorage.setItem('totalPrice', summedPrice);
}

function getRemovedItemPrice(selectedItem) {
  const itemInfo = selectedItem.innerText;
  const priceIndex = itemInfo.indexOf('$') + 1;
  let price = parseFloat(itemInfo.slice(priceIndex));
  price = -price;
  updateTotalPrice(price);
}

async function itemClickListener(event) {
  if (event.target.classList.contains('item__add')) {
    const itemData = await getSelectedItemInfo(event.target);
    const { id: sku, title: name, price: salePrice } = itemData;
    const selectedItemCartElement = createCartItemElement({ sku, name, salePrice });
    updateTotalPrice(salePrice);
    updateCartList(selectedItemCartElement);
    updateTotalPriceElement();
  }

  if (event.target.classList.contains('cart__item')) {
    const cartList = event.target.parentElement;
    const selectedItem = event.target;
    getRemovedItemPrice(selectedItem);
    cartList.removeChild(selectedItem);
    saveCartItems(cartList.innerHTML);
    updateTotalPriceElement();
  }
}

async function getResultFromFetchProducts(product) {
  const acquiredData = await fetchProducts(product);
  const itemsSection = document.querySelector('.items');
  const loadingText = document.querySelector('.loading');
  itemsSection.removeChild(loadingText);
  acquiredData.results.forEach((result) => {
    const { id: sku, title: name, thumbnail: image } = result;
    const returnedItemElement = createProductItemElement({ sku, name, image });
    itemsSection.appendChild(returnedItemElement);
  });
}

function createPricesKey() {
  if (!localStorage.totalPrice) {
    localStorage.setItem('totalPrice', 0);
  }
}

function reloadCartList(storedData) {
  if (storedData) {
  cartItemsList.innerHTML = storedData;
  }
}

function emptyCartList() {
  cartItemsList.innerHTML = '';
  localStorage.clear();
  createPricesKey();
  updateTotalPriceElement();
}

function createTotalPriceElement() {
  const totalPrice = localStorage.getItem('totalPrice');
  const totalPriceParentElement = document.createElement('span');
  totalPriceParentElement.className = 'total-price';
  const totalPriceElement = document.createElement('p');
  totalPriceElement.innerText = totalPrice;
  totalPriceParentElement.appendChild(totalPriceElement);
  cartItemsList.parentElement.appendChild(totalPriceParentElement);
}

window.onload = () => {
  const storedData = getSavedCartItems();
  createPricesKey();
  reloadCartList(storedData);
  createTotalPriceElement();
  getResultFromFetchProducts('computador');
  document.addEventListener('click', itemClickListener);
  document.querySelector('.empty-cart').addEventListener('click', emptyCartList);
};
