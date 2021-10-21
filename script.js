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

function createCartItemElement({ sku, name, salePrice }) {
  const productCart = document.querySelector('.cart__items');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  productCart.appendChild(li);
  // Removido seguindo sugestão do Bernardo
  // return li;
}

const addItemToCart = async (sku) => {
  // cria uma contante com a promise de fetch
  const fetchResponse = await fetchItem(sku);
  // console.log(fetchResponse);
  const { title: name, price: salePrice } = fetchResponse;
  createCartItemElement({ sku, name, salePrice });
  // const productCart = document.querySelector('.cart__items');
  // productCart.appendChild(createCartItemElement({ sku, name, salePrice }));
};

// desestruturação do objeto para acessar as propriedades
function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  // linha já existe, cria uma section que receberá os produtos individualmente
  const section = document.createElement('section');
  // elemento pai que irá receber os computadores/produtos filhos
  const sectionOfProducts = document.querySelector('.items');
  // linha já existente, cria a class da section 
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
  // anexa as sections filhas -- os produtos -- à section pai, com class .items
  sectionOfProducts.appendChild(section);
  // return section;
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

function cartItemClickListener(event) {
  // Feito com ajuda do Miyazaki durante a sala de estudos
  event.target.remove();
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// add a função fetchProduct para carregar com a page
window.onload = () => {
  // função que carrega os computadores
  createComputers();
};
