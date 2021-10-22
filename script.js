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
  section.appendChild(createCustomElement('span', 'item_title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItemsOnScreen = async (productName) => {
  const product = await fetchProducts(productName);
  const listOfItems = document.querySelector('.items');
  product.results.forEach((result) => {
    const { id: sku, title: name, thumbnail: image } = result;
    listOfItems.appendChild(createProductItemElement({ sku, name, image }));
  });
};

const addItemOnCart = async (itemId) => {
  const item = await fetchItem(itemId);
  const cart = document.querySelector('.cart__items');
  const { id: sku, title: name, price: salePrice } = item;
  cart.appendChild(createCartItemElement({ sku, name, salePrice }));
};

const addOnCartListeners = () => {
  const buttons = document.querySelectorAll('.item__add');
  const skuList = document.querySelectorAll('.item__sku');
  buttons.forEach((button, i) => {
    button.addEventListener('click', () => addItemOnCart(skuList[i].innerText));
  });
};

window.onload = () => {
  addItemsOnScreen('computador')
    .then(() => addOnCartListeners());
};
