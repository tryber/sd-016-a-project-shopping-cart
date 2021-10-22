const odinPaiDeTodos = document.querySelector('.cart__items');

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
  // ajuda do Miyazaki
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  // ajuda na sala 03 (ForEver)

  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  odinPaiDeTodos.appendChild(li);
  // help do Brunão
  saveCartItems(odinPaiDeTodos.innerHTML);
}

const getIdAndGetCartItem = async (sku) => {
  // codigo em conjunto na Sala 03 - forEver
  // o ID será desestruturado na função createProductIteElement
  const fetch = await fetchItem(sku);
  const { title: name, price: salePrice } = fetch;
  createCartItemElement({ sku, name, salePrice });
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  // adiciona a classe pai
  const sectionFather = document.querySelector('.items');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const buttonEventAdd = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(buttonEventAdd);

  buttonEventAdd.addEventListener('click', () => {
    getIdAndGetCartItem(sku);
  });
  sectionFather.appendChild(section);
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const verifyFunctionVoidAndRestore = () => {
  const localStorageGetSavedCartItem = getSavedCartItems();
  odinPaiDeTodos.innerHTML = localStorageGetSavedCartItem;
};

const addEventToItemSaved = () => {
  // referência: https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
  Array.from(odinPaiDeTodos.children).forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
};

window.onload = () => {
  // help do Brunão
  if (odinPaiDeTodos.children.length === 0) verifyFunctionVoidAndRestore();
  const getProducts = fetchProducts('computador').then((value) => {
    value.results.forEach((element) => {
      createProductItemElement(element);
    });
  });
  addEventToItemSaved();
};
