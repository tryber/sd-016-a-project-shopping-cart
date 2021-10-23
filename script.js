const getOlList = document.querySelector('.cart__items');

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
  saveCartItems(getOlList.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  getOlList.appendChild(li);  
  saveCartItems(getOlList.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addButton.addEventListener('click', () => {
    addItemCart(sku);
  });
  section.appendChild(addButton);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
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

const addItemCart = async (sku) => {
  const returnFetchItem = await fetchItem(sku);
  const { title: name, price: salePrice } = returnFetchItem;
  createCartItemElement({ sku, name, salePrice });
};

const refreshPage = () => {
  const getResult = getSavedCartItems();
  getOlList.innerHTML = getResult;
};

const restoreEventListener = () => {
  getOlList.addEventListener('click', cartItemClickListener);
};

const clearAllCartItems = () => {
  const getButton = document.querySelector('.empty-cart');
  getButton.addEventListener('click', () => {
    getOlList.innerHTML = '';
    saveCartItems(getOlList.innerHTML);
  });
};

window.onload = () => {
  searchProducts('computador');
  refreshPage();
  restoreEventListener();
  clearAllCartItems();
};