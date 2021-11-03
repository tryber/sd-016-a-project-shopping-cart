const getListCart = document.querySelector('.cart__items');
const getClearButton = document.querySelector('.empty-cart');

// Praticamente todo o código foi feito com a colaboração de [Josue gomes ribeiro, lucas fernandes, Brunão, Danilo Meneguela, Guilherme Duarte, Leonardo Ferreira, Leandro Goerck, Julia Barcelos, Renan Souza, Eduardo Miyazaki] na sala 3 do zoom vlw pessoal  <3 

const showLoadingText = () => {
  const createLoadingElement = document.createElement('p');
  createLoadingElement.className = 'loading';
  createLoadingElement.innerHTML = 'carregando...';
  document.body.append(createLoadingElement);
};

const removeLoadingText = () => {
  const searchLoadingText = document.querySelector('.loading');
  searchLoadingText.remove();
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

 function counter() {
  const totalPrice = document.querySelector('.total-price');
  const restoreLocalStorage = getSavedCartItems();
  if (getListCart.children.length) {
  const arrLocalStorage = restoreLocalStorage.split('PRICE: $');
  arrLocalStorage.shift();
  const newArr = arrLocalStorage.reduce((acc, curr) => {
    acc.push(Number(curr.substring(0, curr.indexOf('<'))));
    return acc;
  }, []);
  const sum = newArr.reduce((acc, curr) => acc + curr);
  totalPrice.innerText = sum;
  return 1; // utilidade do return é parar a função
 }
 totalPrice.innerHTML = 0;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  event.target.remove(event);
  saveCartItems(getListCart.innerHTML);
  counter();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  getListCart.appendChild(li);
  saveCartItems(getListCart.innerHTML);
  counter();
}

const addItemIdToCart = async (sku) => {
  const fetch = await fetchItem(sku);
  const { title: name, price: salePrice } = fetch;
  createCartItemElement({ sku, name, salePrice });
  saveCartItems(getListCart.innerHTML);
  counter();
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const SectionItens = document.querySelector('.items');
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const createEventButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  createEventButton.addEventListener('click', () => {
    saveCartItems(getListCart.innerHTML);
    counter();
    addItemIdToCart(sku);
  });
  section.appendChild(createEventButton);
  SectionItens.appendChild(section);
}

const cartItemsRestore = () => {
  const localStorageRestore = getSavedCartItems();
  getListCart.innerHTML = localStorageRestore;
  counter();
};

const getProducts = () => {
  showLoadingText();
  fetchProducts('computador').then((response) => {
    response.results.forEach((product) => {
      createProductItemElement(product);
    });
    removeLoadingText();
  });
};

// ideia do Array.from retirado do link https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
const restoreEventListener = () => {
  const addRemoveAgain = Array.from(getListCart.children);
  addRemoveAgain.forEach((child) => {
    child.addEventListener('click', cartItemClickListener);
  });
  counter();
};
// contribuição do Leandro Goerck
function clearListButton() {
  getListCart.innerHTML = '';
  saveCartItems(getListCart.innerHTML);
  counter();
}

getClearButton.addEventListener('click', clearListButton);

window.onload = () => {
  getProducts();
  if (getListCart.children.length === 0) cartItemsRestore();
  restoreEventListener();
  counter();
 };
