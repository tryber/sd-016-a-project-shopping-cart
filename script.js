const cartItem = document.querySelector('.cart__items');
const emptyCart = document.querySelector('.empty-cart');
const loading = document.querySelector('.loading');

const priceContainer = document.querySelector('.total-price');

emptyCart.addEventListener('click', () => {
  cartItem.innerHTML = '';
  localStorage.clear();
  priceContainer.innerHTML = '';
});

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

async function priceRemoveUpdater(id) {
  const item = await fetchItem(id);

  const totalPrice = parseFloat(priceContainer.innerText, 10) - parseFloat(item.price, 10);
  priceContainer.innerText = totalPrice % 1 === 0 ? totalPrice.toFixed() : totalPrice.toFixed(1);  
}

async function priceUpdater(id) {
  const item = await fetchItem(id);
  if (priceContainer.innerText) {
    const totalPrice = parseFloat(priceContainer.innerText, 10) + parseFloat(item.price, 10);
    priceContainer.innerText = totalPrice % 1 === 0 ? totalPrice : totalPrice.toFixed(2);  
  } else {
    priceContainer.innerText = item.price;
  }
}

function getSkuFromProductItem(item) {
  const splitedName = item.innerText.split(' ');
  return splitedName[1];
}

// eventlistener para remover produtos do carrinho
function cartItemClickListener(element) {
  element.target.remove();
  saveCartItems(cartItem.innerHTML);
  const elemId = getSkuFromProductItem(element.target);
  priceRemoveUpdater(elemId);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createCartButton(id) {
  const b = document.createElement('button');
  b.className = 'item__add';
  b.innerText = 'Adicionar ao carrinho';
  
  b.addEventListener('click', async () => {
    const item = await fetchItem(id);
    const { id: sku, title: name, price: salePrice } = item;
    cartItem.appendChild(createCartItemElement({ sku, name, salePrice }));
    saveCartItems(cartItem.innerHTML);
    priceUpdater(id);
  });

  return b;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCartButton(sku));

  return section;
}

async function searchProducts(query) {
  await fetchProducts(query).then((value) => {
    value.results.forEach((product) => {
      const { id: sku, title: name, thumbnail: image } = product;
      const itens = document.querySelector('.items');
      itens.appendChild(createProductItemElement({ sku, name, image }));
    });
  });
  loading.remove();
}

function loadCartItems() {
  const storedCartItems = getSavedCartItems();
  cartItem.innerHTML = storedCartItems;
  Object.keys(cartItem.children)
    .forEach((elem) => {
      cartItem.children[elem].addEventListener('click', cartItemClickListener);
      const elemSku = getSkuFromProductItem(cartItem.children[elem]);
      priceUpdater(elemSku);
    });
}

window.onload = () => { 
  searchProducts('computador');
  loadCartItems();
};
