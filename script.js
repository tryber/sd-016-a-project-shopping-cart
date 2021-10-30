const itemsList = document.querySelector('.items');
const cartList = document.querySelector('.cart__items');
const priceValue = document.querySelector('#price-value');
const clearButton = document.querySelector('.empty-cart');

async function updatePrice(id, operation) { // TODO precisa ter precisão?
  let { price } = await fetchItem(id);
  if (operation === '-') price *= -1;
  priceValue.innerHTML = parseInt(priceValue.innerHTML, 10) + Math.round(price * 100) / 100;
}

function updateCart({ id, parentNode }, operation) {
  updatePrice(id, operation);
  saveCartItems(parentNode);
}

function clearCart() {
  const { children } = cartList;
  while (children.length !== 0) {
    const next = children[0];
    updateCart(next, '-');
    next.remove();
  }
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener({ target }) {
  updateCart(target, '-');
  target.remove();
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

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemToCart({ target }) {
  const id = getSkuFromProductItem(target.parentNode);
  const { title, price } = await fetchItem(id);
  const cartItem = createCartItemElement({ sku: id, name: title, salePrice: price });
  cartList.appendChild(cartItem);
  updateCart(cartItem, '+');
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', addItemToCart);
  section.appendChild(button);

  return section;
}

async function createProductList(search) {
  try {
    const { results } = await fetchProducts(search);
    results.forEach((element) => {
      const { id, title, thumbnail } = element;
      itemsList.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
    });
  } catch (error) { console.log(error); }
}

const downloadCartList = () => { // inspirado no trabalho do [Adson Gomes Oliveira] // apesar de horas de pesquisa, eu ainda não tinha a minima ideia de como resolver esse problema
  const listHtml = getSavedCartItems();
  cartList.innerHTML = listHtml; // foi essa linha que eu não consegue achar ou ver
  const { children } = cartList;
  for (let i = 0; i < children.length; i += 1) {
    children[i].addEventListener('click', cartItemClickListener);
    updatePrice(children[i].id);
  }
};

window.onload = () => { 
  createProductList('computador'); // retirar isso daki;
  downloadCartList();
  clearButton.addEventListener('click', clearCart);
}; 
