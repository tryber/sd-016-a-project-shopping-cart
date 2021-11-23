// const { fetchItem } = require('./helpers/fetchItem');

// Recebi ajuda do ilustre grupo do Front End
const listItem = document.querySelector('.cart__items');

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

// function getSkuFromProductItem(item) {
  // return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const createCartItems = async (sku) => {
  try {
    const data = await fetchItem(sku);
    const cart = createCartItemElement(data);
    listItem.appendChild(cart);
  } catch (error) {
    console.log(error); 
  }
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(button);
  button.addEventListener('click', () => createCartItems(sku));
  return section;
}

function saveItems() {
  // const button = document.querySelectorAll('.item_add');
  listItem.addEventListener('click', () => {
    saveCartItems(listItem.innerHTML);
  });
}
async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const loading = document.querySelector('.loading');
  loading.remove();
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

function getandSaveItems() {
  listItem.innerHTML = getSavedCartItems();
}

window.onload = () => { 
  searchProducts('computador')
  .then(() => getandSaveItems())
    .then(() => saveItems());
};
