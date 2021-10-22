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

const totalValueProductsCart = () => {
  if (localStorage.getItem('cartItems') === null) {
    return localStorage.setItem('cartItems', JSON.stringify([]));
  }
  const storage = JSON.parse(localStorage.getItem('cartItems')); 
  const resultTotal = storage.reduce((acc, currentItem) => acc + currentItem.salePrice, 0);
  localStorage.setItem('cartItemsTotal', JSON.stringify(resultTotal));
  return resultTotal;
};

const printValueProductsCart = () => {
  if (localStorage.getItem('cartItemsTotal') === null) { 
    return localStorage.setItem('cartItemsTotal', 0); 
  }
  const elementH3Total = document.querySelector('#cart__total'); 
  const valueTotalStorage = localStorage.getItem('cartItemsTotal');
  elementH3Total.innerText = valueTotalStorage;
};

function cartItemClickListener(event, sku) {
  const storage = JSON.parse(getSavedCartItems()) || [];
  const resutl = storage.filter((returnItem) => returnItem.sku !== sku);
  saveCartItems(JSON.stringify(resutl)); 
  totalValueProductsCart();
  printValueProductsCart();
  return event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => cartItemClickListener(event, sku));
  return li;
}

async function addItemToCart(sku) {
  const { title: name, price: salePrice } = await fetchItem(sku);
  containerCartItems.appendChild(createCartItemElement({ sku, name, salePrice }));
  
  // cartItems.push({ sku, name, salePrice });
  const storage = JSON.parse(getSavedCartItems()) || [];
  storage.push({ sku, name, salePrice });
  saveCartItems(JSON.stringify(storage));
  totalValueProductsCart();
  printValueProductsCart();
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

const clearCartAllItems = () => {
  const elementH3Total = document.querySelector('#cart__total'); 
  localStorage.removeItem('cartItems');  
  localStorage.removeItem('cartItemsTotal');
  containerCartItems.innerHTML = '';
  elementH3Total.innerHTML = 0;
};
const btnClearAllItems = document.querySelector('.empty-cart');
btnClearAllItems.addEventListener('click', () => {
  clearCartAllItems();
});

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

const renderItemsToSreen = async () => {
  const data = await fetchProducts('computador');
  data.results.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    containerProducts.appendChild(createProductItemElement({ sku, name, image }));
  });
};
renderItemsToSreen();

window.onload = () => {
  printValueProductsCart();
  if (getSavedCartItems() === null) return localStorage.setItem('cartItems', JSON.stringify([]));
  if (getSavedCartItems() === undefined) return; 
  
  printValueProductsCart();
  const listItemsStorage = getSavedCartItems();
  const resultGetLocalStorage = JSON.parse(listItemsStorage);
  resultGetLocalStorage.forEach((item) => {
    const { sku, name, salePrice } = item;
    containerCartItems.appendChild(
      createCartItemElement({ sku, name, salePrice }),
    );
  });
};
