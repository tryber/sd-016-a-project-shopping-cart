const ol = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText; // Cria um elemento html;
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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function sumPricesOfCartItems() {
  let total = 0;
  Array.from(ol.children).forEach((element) => {
     total += parseInt(element.classList[1], 10);
  });
 return total;
}

function addTotalSpan() {
  const span = document.querySelector('.total');
  span.innerHTML = `Total : R$ ${sumPricesOfCartItems()}`;
}

function cartItemClickListener(event) { // remove itens do Cart.
  const olItems = document.querySelector('.cart__items');
  olItems.removeChild(event.target);
  saveCartItems(ol.innerHTML);
  addTotalSpan();
}

function createCartItemElement({ sku, name, salePrice }) { // Cria os itens do Cart e adiciona click listener em todos.
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.classList.add(salePrice);
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addCartItems(id) { // Adiciona os itens clicados ao cart.
  const item = await fetchItem(id);
  const object = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  const li = createCartItemElement(object);
  ol.appendChild(li);
  saveCartItems(ol.innerHTML);
  sumPricesOfCartItems();
  addTotalSpan();
}

function addButtonItemsListenner() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const span = event.target.parentNode.firstChild;
      const id = span.innerText; 
      addCartItems(id);
    });
  });
}

function addLoadingText() {
  const sectionItems = document.querySelector('.items');
  const loading = document.createElement('span');
  loading.innerHTML = 'Carregando...';
  loading.className = 'loading';
  sectionItems.appendChild(loading);
}

function removeLoadingText() {
  const section = document.querySelector('.items');
  const span = document.querySelector('.loading');
  section.removeChild(span); 
}

async function addProducts(product) { // Adiciona os produtos na tela.
  addLoadingText();
  const searchProducts = await fetchProducts(product);
  searchProducts.results.forEach((item) => {
   const objectItem = {
     sku: item.id,
     name: item.title,
     image: item.thumbnail,
   };
   const sectionProduct = createProductItemElement(objectItem);
   const section = document.querySelector('.items');
   section.appendChild(sectionProduct);
  });
  addButtonItemsListenner();
  removeLoadingText();
 }

function getLocalStorage() {
  const itemsSaved = getSavedCartItems();
  ol.innerHTML = itemsSaved;
}

function addEventItemStotorage() {
  Array.from(ol.children).forEach((children) => {
    children.addEventListener('click', cartItemClickListener);
  });
}

function clearButtonListener() {
  const clearButton = document.querySelector('.empty-cart');
  clearButton.addEventListener('click', () => {
    ol.innerHTML = '';
    addTotalSpan();
  });
}

window.onload = () => { 
  addProducts('computador');
  if (ol.children.length === 0) {
    getLocalStorage();
  }
  addEventItemStotorage();
  addTotalSpan();
  clearButtonListener();
 };
