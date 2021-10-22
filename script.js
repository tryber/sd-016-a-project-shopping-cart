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
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  // função 'cartItemClickListener'ja esta implementada na função 'createCartItemElement', com eventListener pré estabelecido,
  // basicamente esperando uma logica de remoção. 
  event.target.remove();
  saveCartItems(ol.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  // adiciona lista na 'ol' criada, os produtos chamados da função 'getItemsProduct'.
  ol.appendChild(li);
  saveCartItems(ol.innerHTML);
}

// função responsavel para buscar as informações do produto através do 'sku'.
const getItemsProduct = async (sku) => {
  const fetch = await fetchItem(sku);
  const { title: name, price: salePrice } = fetch;
  createCartItemElement({ sku, name, salePrice });
};

// função refatorada devido a dica do Brunão e Victor Farias Summer na tribo 16 for(ever).
function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  const sectionProduct = document.querySelector('.items');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  // aproveitado a função para criar junto o evento para os items.
  const buttonEvent = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');

  buttonEvent.addEventListener('click', () => {
    getItemsProduct(sku);
    saveCartItems();
  });

  section.appendChild(buttonEvent);
  sectionProduct.appendChild(section);
  return section;
}

// adicona o produtos a section '.itens'.
const getProduct = () => fetchProducts('computador').then((value) => {
  value.forEach((product) => {
    createProductItemElement(product);
  });
});

const saveAndLocalStorage = () => {
  const olCart = getSavedCartItems();
  ol.innerHTML = olCart;
};

const removeEventListener = () => {
  Array.from(ol.children).forEach((value) => {
    value.addEventListener('click', cartItemClickListener);
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = () => {
  getProduct();
  if (ol.children.length === 0) saveAndLocalStorage();
  removeEventListener();
};