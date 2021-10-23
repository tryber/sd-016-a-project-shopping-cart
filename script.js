const sectionItems = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');

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
  cartItems.appendChild(cartList);
  saveCartItems(cartItems.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

const callFetchProducts = () => {
  fetchProducts('computador').then((products) => {
    products.results.forEach((product) => {
      const { id: sku, title: name, thumbnail: image } = product;
      sectionItems.appendChild(createProductItemElement({ sku, name, image }));
    });
  });
};

function saveItemsCart() {
  cartItems.innerHTML = getSavedCartItems();
}

function clearCart() {
  cartItems.innerHTML = '';
}

cartItems.addEventListener('click', cartItemClickListener);
document.querySelector('.empty-cart').addEventListener('click', clearCart);

window.onload = () => {
  callFetchProducts();
  saveItemsCart();
};
