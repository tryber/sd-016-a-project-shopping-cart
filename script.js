const itemsList = document.querySelector('.items');
const cartList = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const clearButton = document.querySelector('.empty-cart');

function roundToDecimals(number, decimals) {
  return Math.round((number) * (10 ** decimals)) / (10 ** decimals);
}

async function updatePrice(id, signal) {
  const { price } = await fetchItem(id);
  totalPrice.innerText = roundToDecimals(parseFloat(totalPrice.innerText, 10) + price * signal, 2);
}

function updateCart(id, parentNode, operation) {
  updatePrice(id, operation);
  saveCartItems(parentNode.innerHTML);
}

function clearCart() {
  const { children } = cartList;
  while (children.length !== 0) {
    const { id, parentNode } = children[0];
    children[0].remove();
    updateCart(id, parentNode, -1);
  }
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener({ target }) {
  const { id, parentNode } = target;
  target.remove();
  updateCart(id, parentNode, -1);
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
  updateCart(id, cartItem.parentNode, 1);
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
  createProductList('computador'); // retirar isso daki depois?;
  downloadCartList();
  clearButton.addEventListener('click', clearCart);
}; 
