// Código só foi possívl graças à união da classe for(ever).
// a União faz a força!
const getOl = document.querySelector('.cart__items');
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

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addToCart(id) {
  const request = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = request;
  const cartList = createCartItemElement({ sku, name, salePrice });
  getOl.appendChild(cartList);
  saveCartItems(getOl.innerHTML);
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const getSectionItems = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const clickableButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho');
  clickableButton.addEventListener('click', () => {
    addToCart(sku);
  });
  section.appendChild(clickableButton);
  getSectionItems.appendChild(section);
  return section;
}

const listOfProducts = (categoria) => {
  fetchProducts(categoria).then((value) =>
    value.forEach((product) => {
    createProductItemElement(product);
  }));
};

function restoreCart() {
  getOl.innerHTML = getSavedCartItems();
}

getOl.addEventListener('click', cartItemClickListener);

window.onload = () => { 
  listOfProducts('computador');
  restoreCart();
};
