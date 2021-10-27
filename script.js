function readList() {
  return document.querySelector('.cart__items');
}

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

function createProductItemElement(sku, name, image) {
  const sectionOfItems = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return sectionOfItems.appendChild(section);
}

function calcValues(arrToGetPrice) {
  const getValues = arrToGetPrice.map((product) => {
    const splitText = product.split('$');
    const getCost = splitText[splitText.length - 1];
    const convert = parseFloat(getCost);
    return convert;
  });
  getValues.unshift(0);
  return getValues;
}

function calcProducts() {
  const cartItems = document.querySelectorAll('.cart__item');
  const totalPrice = document.querySelector('.total-price');
  const priceFinalCalc = (acc, crr) => acc + crr;

  const productsText = [];

  cartItems.forEach((cartItem) => {
    productsText.push(cartItem.innerText);
  });

  const arrToCalc = calcValues(productsText);
  const priceFinal = arrToCalc.reduce(priceFinalCalc);

  totalPrice.innerText = `${priceFinal}`;
}

function calcCall() {
  calcProducts();
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  calcCall();
}

function createCartItemElement(sku, name, salePrice) {
  const cartList = readList();
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  cartList.appendChild(li);
  saveCartItems();
  calcCall();
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function eventClick() {
  const cartButton = document.querySelectorAll('.item__add');
  const cartList = readList();

  cartButton.forEach((button) => {
    button.addEventListener('click', async (originEvent) => {
      const recoverID = originEvent.target.parentElement;
      const getSku = getSkuFromProductItem(recoverID);
      const objProduct = await fetchItem(getSku);
      const { id, title, price } = objProduct;
      createCartItemElement(id, title, price);
      saveCartItems(cartList.innerHTML);
    });
  });
}

function recoverItemsFromStorage() {
  const olList = readList();
  const storageSaved = getSavedCartItems();

  olList.innerHTML = storageSaved;

  const items = olList.querySelectorAll('li');

  items.forEach((item) => {
    item.addEventListener('click', (originEvent) => {
      originEvent.target.remove();
      calcCall();
    });
  });

  calcCall();
}

async function trackMercadoLivreItems() {
  const itemsTracked = await fetchProducts('computador');
  const resultOfItems = await itemsTracked.results;
  await resultOfItems.forEach((product) => {
    const { id, title, thumbnail } = product;
    createProductItemElement(id, title, thumbnail);
  });

  eventClick();
}

window.onload = () => { 
  trackMercadoLivreItems();
  recoverItemsFromStorage();
};