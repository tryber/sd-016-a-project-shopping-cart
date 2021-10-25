const orderedList = document.querySelector('.cart__items');
const clearButton = document.querySelector('.empty-cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  event.target.remove();
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
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
  }

async function addCartItem(id) {
  const request = await fetchItem(id);
  const cartItems = document.querySelector('.cart__items');
  const { id: sku, title: name, price: salePrice } = request;
  const cartList = createCartItemElement({ sku, name, salePrice }); 
  cartItems.appendChild(cartList);
  saveCartItems(orderedList.innerHTML);
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const sectionPai = document.querySelector('.items');
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  sectionPai.appendChild(section);
  const clickButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  clickButton.addEventListener('click', () => {
    addCartItem(sku);
  });
  section.appendChild(clickButton);
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function listProducts(search) {
  return fetchProducts(search)
  .then((data) => 
  data.results.forEach((product) => 
  createProductItemElement(product)));
}

const restoreCart = () => {
  orderedList.innerHTML = getSavedCartItems();  
};
orderedList.addEventListener('click', cartItemClickListener);

const clearCart = () => {
  orderedList.innerHTML = '';
  saveCartItems(orderedList.innerHTML);
};
  clearButton.addEventListener('click', clearCart);

window.onload = () => { 
  listProducts('computador');
  restoreCart();
};

// Feito com auxilio de: Renan Souza, Lucas Alves, Fabricio Martins, Rafael Feliciano, Vitor Brandao em uma sala do zoom
