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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
  // return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(listItem.innerHTML);
  console.log(listItem.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  document.querySelector('.loading').remove();
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

async function adicionaCarrinho(product) {
  const itemData = await fetchItem(product.innerText);
  const experimentItem = createCartItemElement(itemData);
  listItem.appendChild(experimentItem);
  saveCartItems(listItem.innerHTML);
  console.log(listItem.innerHTML);
}

function clickMe() {
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('item__add')) {
      adicionaCarrinho(event.target.parentNode.firstChild);
    }  
  });
}

const iniciaLocalStorage = () => {
  listItem.innerHTML = getSavedCartItems();
};  

function addRemoveItem() {
  const allItems = document.querySelectorAll('.cart__items li');
  allItems.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
  console.log(allItems);
}

function clearCartItems() {
  const clearButton = document.querySelector('.empty-cart');
  clearButton.addEventListener('click', () => {
    listItem.innerHTML = '';
    saveCartItems(listItem.innerHTML);
  });
}

window.onload = () => { 
  searchProducts('computador')
  .then(() => iniciaLocalStorage())
  .then(() => {
    clickMe();
    addRemoveItem();
    clearCartItems();
  });
};
