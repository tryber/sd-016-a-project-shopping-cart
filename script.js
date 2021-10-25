const cartItem = document.querySelector('.cart__items');
const emptyCart = document.querySelector('.empty-cart');
const loading = document.querySelector('.loading');
const price = document.querySelector('.total-price');

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

function getSkuFromProductItem(item) {
  const splitedName = item.innerText.split(' ');
  return splitedName[1];
}

async function priceRemoveUpdater(id) {
  const item = await fetchItem(id);

  const totalPrice = parseFloat(price.innerText, 10) - parseFloat(item.price, 10);
  price.innerText = totalPrice % 1 === 0 ? totalPrice.toFixed() : totalPrice.toFixed(1);  
}

async function priceUpdater(id) {
  const item = await fetchItem(id);
  if (price.innerText) {
    const totalPrice = parseFloat(price.innerText, 10) + parseFloat(item.price, 10);
    price.innerText = totalPrice % 1 === 0 ? totalPrice : totalPrice.toFixed(2);  
  } else {
    price.innerText = item.price;
  }
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItem.innerHTML);
  const product = getSkuFromProductItem(event.target);
  priceRemoveUpdater(product);
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
async function products(product) {
  const productData = await fetchProducts(product);
  const section = document.querySelector('.items');
  console.log(productData);
  productData.results.forEach((item) => {
    const itemObj = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productSection = createProductItemElement(itemObj);
    section.appendChild(productSection);
  });
}

window.onload = () => {
  products('computador');
};

// Requisitos 3 e 5 feitos com auxilio de codereview do colega Carlos Dartora;