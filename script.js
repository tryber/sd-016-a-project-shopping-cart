const productCart = document.querySelector('.cart__items');
const clearCartButton = document.querySelector('.empty-cart');
const totalPriceElement = document.querySelector('.total-price');

const createLoadingAlert = () => {
  // feito com auxílio do Brunão na sala de estudos
  const loadingAlert = document.createElement('p');
  loadingAlert.classList.add('loading');
  loadingAlert.innerText = 'carregando...';
  document.body.append(loadingAlert);
};

const removeLoadingAlert = () => {
  const loadingAlert = document.querySelector('.loading');
  loadingAlert.remove();
};

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

const getSumOfProductsInCart = () => {
  const totalPrice = document.querySelector('.total-price');
  const loadedLocalStorageCart = getSavedCartItems();
  if (productCart.children.length > 0) {
    const loadedPrices = loadedLocalStorageCart.split('PRICE: $');
    const prices = loadedPrices.reduce((acc, curr) => {
      acc.push(curr);
      return acc;
    }, []);
    prices.shift();
    totalPrice.innerText = prices.reduce((acc, curr) => {
      acc.push(Number(curr.substring(0, curr.indexOf('<'))));
      return acc;
    }, []).reduce((acc, curr) => acc + curr);
    return 0;
  }
  totalPrice.innerHTML = 0;
};

function cartItemClickListener(event) {
  // Feito com ajuda do Miyazaki durante a sala de estudos
  event.target.remove();
  // com base no brunão, tem de chamar a func do savecartItem com o inner html
  // depois chama a func da soma
  saveCartItems(productCart.innerHTML);
  getSumOfProductsInCart();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  // li.addEventListener('click', getSumOfProductsInCart);
  productCart.appendChild(li);
  // return li; foi removido seguindo sugestão do Bernardo
  // innertHTML chama o html de tudo de dentro dele, inclusive as li da lista do carrinho
  saveCartItems(productCart.innerHTML);
  getSumOfProductsInCart();
}

const addItemToCart = async (sku) => {
  // cria uma contante com a promise de fetch
  const fetchResponse = await fetchItem(sku);
  // console.log(fetchResponse);
  const { title: name, price: salePrice } = fetchResponse;
  createCartItemElement({ sku, name, salePrice });
  getSumOfProductsInCart();
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
  const createAddButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  createAddButton.addEventListener('click', () => {
    addItemToCart(sku);
  });
  section.appendChild(createAddButton);
  // anexa as sections filhas -- os produtos -- à section pai, com class .items --- return section removido como sugestão do Bernardo
  sectionOfProducts.appendChild(section);
  getSumOfProductsInCart();
}

// FUNÇÃO QUE CRIA OS COMPUTADORES OU OUTROS PRODUTOS
const createProducts = () => {
  createLoadingAlert();
  // o then é porque está esperando uma promessa
  fetchProducts('computador').then((response) => {
    // feito com base na sala de estudos com Bernardo
    // acessa o results do objeto maior enviado da API
    response.results.forEach((computador) => {
      createProductItemElement(computador);
    });
  removeLoadingAlert();
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function loadLocalStorageCart() {
  // const que recebe o valor de html salvo no local storage
  const savedData = getSavedCartItems();
  // console.log(savedData)
  productCart.innerHTML = savedData;
  getSumOfProductsInCart();
}

// array from baseado na seguinte fonte -- feito na sala de estudo em grupo
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
const restoreRemoveOnClick = () => {
  Array.from(productCart.children).forEach((child) => {
    child.addEventListener('click', cartItemClickListener);
  });
  getSumOfProductsInCart();
};

// Função feita a partir do código do Leandro Goerck na salinha de estudos em grupo
function clearProductsInTheCart() {
  productCart.innerHTML = '';
  saveCartItems(productCart.innerHTML);
  getSumOfProductsInCart();
}

function emptyPricesInCart() {
  totalPriceElement.innerHTML = '';
}

clearCartButton.addEventListener('click', clearProductsInTheCart);
clearCartButton.addEventListener('click', emptyPricesInCart);

window.onload = () => {
  createProducts();
  // feito com base no código do Brunão na salinha de estudos
  if (productCart.children.length === 0) loadLocalStorageCart();
  restoreRemoveOnClick();
  getSumOfProductsInCart();
};

// Durante esse projeto tive o apoio dos seguintes colegas nas salas de estudo
// CONTRIBUTORS:
// Josue Gomes Ribeiro, 
// Lucas Fernandes, 
// Danilo Meneguela, 
// Leonardo Ferreira, 
// Leandro Goerck,
// Julia Barcelos,
// Renan Souza,
// Eduardo Miyazaki,
// Brunão,
// Guilherme Augusto
