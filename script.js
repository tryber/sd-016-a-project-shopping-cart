const productCart = document.querySelector('.cart__items');
const clearCartButton = document.querySelector('.empty-cart');

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
  // Feito com ajuda do Miyazaki durante a sala de estudos
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  productCart.appendChild(li);
  // return li; foi removido seguindo sugestão do Bernardo
  // innertHTML chama o html de tudo de dentro dele, inclusive as li da lista do carrinho
  saveCartItems(productCart.innerHTML);
}

const addItemToCart = async (sku) => {
  // cria uma contante com a promise de fetch
  const fetchResponse = await fetchItem(sku);
  // console.log(fetchResponse);
  const { title: name, price: salePrice } = fetchResponse;
  createCartItemElement({ sku, name, salePrice });
};

// desestruturação do objeto para acessar as propriedades
function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  // elemento pai que irá receber os computadores/produtos filhos
  const sectionOfProducts = document.querySelector('.items');
  section.className = 'item';
  // exercicio feito durante sala de estudos
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  // section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  const createAddButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  createAddButton.addEventListener('click', () => {
    addItemToCart(sku);
  });
  section.appendChild(createAddButton);
  // anexa as sections filhas -- os produtos -- à section pai, com class .items --- return section removido como sugestão do Bernardo
  sectionOfProducts.appendChild(section);
}

// FUNÇÃO QUE CRIA OS COMPUTADORES
const createComputers = () => {
  // o then é porque está esperando uma promessa
  fetchProducts('computador').then((response) => {
    // feito com base na sala de estudos com Bernardo
    // acessa o results do objeto maior enviado da API
    response.results.forEach((computador) => createProductItemElement(computador));   
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function loadLocalStorageCart() {
  // const que recebe o valor de html salvo no local storage
  const savedData = getSavedCartItems();
  productCart.innerHTML = savedData;
}

// array from baseado na seguinte fonte -- feito na sala de estudo em grupo
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
const restoreRemoveOnClick = () => {
  Array.from(productCart.children).forEach((child) => {
    child.addEventListener('click', cartItemClickListener);
  });
};

window.onload = () => {
  createComputers();
  // feito com base no código do Brunão na salinha de estudos
  if (productCart.children.length === 0) loadLocalStorageCart();
  restoreRemoveOnClick();
};

function clearProductsInTheCart() {
  productCart.innerHTML = '';
  saveCartItems(productCart.innerHTML);
}

clearCartButton.addEventListener('click', clearProductsInTheCart);
