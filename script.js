// Com colaboração de Priscila Silva

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

// Elaborado com ajuda do Otávio Cantarelli

function cartItemClickListener(event, sku, price) {
  const div = document.querySelector('.total-price');
  const findElement = cartItems.find((item) => item.sku === sku);
  const findIndexOfElement = cartItems.indexOf(findElement);
  cartItems.splice(findIndexOfElement, 1);
  saveCartItems(JSON.stringify(cartItems));

  div.innerText = (sum -= price).toPrecision();
  event.target.remove();
}

function createCartItemElement({ sku, name, price }) {
  const getOlItemElements = document.querySelector('.cart__items');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${price}`;
  getOlItemElements.appendChild(li);

  li.addEventListener('click', (event) => cartItemClickListener(event, sku, price));
}

const addItemToCart = async (sku) => {
  const allItens = await fetchItem(sku);
  const { title: name, price } = allItens;
  createCartItemElement({ sku, name, price });
};

function createProductItemElement({ sku, name, image, price }) {
  const buttonAddToCart = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  const section = document.createElement('section');
  const productSection = document.querySelector('.items');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const div = document.querySelector('.total-price');

  buttonAddToCart.addEventListener('click', () => {
    addItemToCart(sku);
    div.innerText = (sum += price).toPrecision();
    cartItems.push({ sku, name, price });
    saveCartItems(JSON.stringify(cartItems));
  });
  section.appendChild(buttonAddToCart);
  productSection.appendChild(section);
  return section;
}

const productByName = async (paramItem) => {
  const promisse = await fetchProducts(paramItem);
  promisse.forEach(({ id, title, thumbnail }) => {
    const obj = { sku: id, name: title, image: thumbnail };
    document.querySelector('.items').appendChild(createProductItemElement(obj));
  });
  document.querySelector('.loading').remove();
};

// function getSkuFromProductItem(item) {
//  return item.querySelector('span.item__sku').innerText;
// }

// function createCartItemElement({ sku, name, salePrice }) {
//  const li = document.createElement('li');
//  li.className = 'cart__item';
//  li.setAttribute('data-price', `${salePrice}`);
// li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
// li.addEventListener('click', cartItemClickListener);
//  const removeTudo = document.querySelector('.empty-cart');
//  removeTudo.addEventListener('click', removerCarrinho);
//  totalpreço += salePrice;
//  preçosalvo.innerHTML = totalpreço;
//  return li;
// }

window.onload = () => {
  productByName('computador');
  getSavedWithListenner();
};