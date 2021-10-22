const containerProducts = document.querySelector('.items');
const containerCartItems = document.querySelector('.cart__items');

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
const cartItems = [];
const findCartItems = [];
function cartItemClickListener(event) {
  const getIdItemTarget = event.target.id;
  const storage = JSON.parse(localStorage.getItem('cartItems'));
 
  const resutl = storage.find((returnItem) => returnItem.sku === getIdItemTarget);
  findCartItems.push(resutl);
  saveCartItems(JSON.stringify(findCartItems)); 
  return event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemToCart(sku) {
  const { title: name, price: salePrice } = await fetchItem(sku);
  containerCartItems.appendChild(createCartItemElement({ sku, name, salePrice }));
  cartItems.push({ sku, name, salePrice });
  saveCartItems(JSON.stringify(cartItems));
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btnAddCart = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btnAddCart.addEventListener('click', () => addItemToCart(sku));
  section.appendChild(btnAddCart);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const renderItemsToSreen = async () => {
  const data = await fetchProducts('computador');
  data.results.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    containerProducts.appendChild(createProductItemElement({ sku, name, image }));
  });
};
renderItemsToSreen();

window.onload = () => {
  if (getSavedCartItems() === null) return localStorage.setItem('cartItems', JSON.stringify([]));
  if (getSavedCartItems() === undefined) return; 

  const listItemsStorage = getSavedCartItems();
  const resultGetLocalStorage = JSON.parse(listItemsStorage);
  resultGetLocalStorage.forEach((item) => {
    const { sku, name, salePrice } = item;
    containerCartItems.appendChild(
      createCartItemElement({ sku, name, salePrice }),
    );
  });
};
