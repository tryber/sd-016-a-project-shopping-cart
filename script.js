// ============================================================ //
// ========= Global variables and implementations. ============ //
// ============================================================ //

const olListCart = document.querySelector('.cart__items');
const getClearButton = document.querySelector('.empty-cart');

// ============================================================ //
// ======================= FUNCTIONS ========================== //
// ============================================================ //

const createLoading = () => {
  const loadingElement = document.createElement('h1');
  loadingElement.classList.add('loading');
  loadingElement.innerHTML = 'carregando';
  document.body.append(loadingElement);
};

const removeLoading = () => {
  const loadingElement = document.querySelector('.loading');
  loadingElement.remove();
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const priceCounter = () => {
  const createCounter = document.querySelector('.total-price');
  const localStorageRestore = getSavedCartItems();
  if (olListCart.children.length) {
    const counter = localStorageRestore.split('PRICE: $');
    const result = counter.reduce((acc, data) => {
      acc.push(data);
      return acc;
    }, []);
    result.shift();
    createCounter.innerText = result.reduce((handler, value) => {
      handler.push(Number(value.substring(0, value.indexOf('<'))));
      return handler;
    }, []).reduce((gather, current) => gather + current);
    return 0;
  }
  createCounter.innerHTML = 0;
};

const cartItemClickListener = (event) => {
  // Graças ao Miyazaki!!!!!!
  event.target.remove();
  saveCartItems(olListCart.innerHTML);
  priceCounter();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  olListCart.appendChild(li);
  saveCartItems(olListCart.innerHTML);
  priceCounter();
};

const addCartItem = async (sku) => {
  const fetch = await fetchItem(sku);
  const { title: name, price: salePrice } = fetch;
  createCartItemElement({ sku, name, salePrice });
  priceCounter();
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  const sectionElement = document.querySelector('.items');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const createButtonEvent = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  createButtonEvent.addEventListener('click', () => addCartItem(sku));
  section.appendChild(createButtonEvent);
  sectionElement.appendChild(section);
  priceCounter();
};

const fetchProductsReturn = () => {
  createLoading();
  fetchProducts('computador').then((value) => {
    value.results.forEach((product) => {
      createProductItemElement(product);
    });
  removeLoading();
  });
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemsRestore = () => {
  const localStorageRestore = getSavedCartItems();
  olListCart.innerHTML = localStorageRestore;
  priceCounter();
};

const restoreEventListenerCartItem = () => {
  Array.from(olListCart.children).forEach((child) => {
    child.addEventListener('click', cartItemClickListener);
  });
  priceCounter();
};

const clearCart = () => {
  olListCart.innerHTML = '';
  saveCartItems(olListCart.innerHTML);
  priceCounter();
};

getClearButton.addEventListener('click', clearCart);

window.onload = () => {
  fetchProductsReturn();
  if (olListCart.children.length === 0) cartItemsRestore();
  restoreEventListenerCartItem();
  priceCounter();
};

// ============================================================ //
// ============= ACKNOWLEDGEMENTS & REFERENCES ================ //
// ============================================================ //

// Function priceCounter():
// Usage of methods .substring() and .indexOf() extracted from:
// === https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
// === https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
// === https://stackoverflow.com/questions/4250364/how-to-trim-a-file-extension-from-a-string-in-javascript/4250408#4250408

// Function restoreEventListenerCartItem():
// Usage of method Array.form() extracted from:
// https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from

// Function clearCart done with the solution of Leandro Goerck.

/* 
CONTRIBUTORS:
Josue Gomes Ribeiro, 
Lucas Fernandes, 
Danilo Meneguela, 
Leonardo Ferreira, 
Leandro Goerck,
Julia Barcelos,
Renan Souza,
Eduardo Miyazaki,
Guilherme Duarte,
Guilherme Augusto
*/

