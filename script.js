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
  return event;
}

function createCartItemElement({ sku, name, salePrice }) {
  const ol = document.querySelector('.cart__items');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  ol.appendChild(li);
}

const getId = async (sku) => {
 const idInfos = await fetchItem(sku);
 const { title: name, price: salePrice } = idInfos;
 createCartItemElement({ sku, name, salePrice });
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  const sectionPai = document.querySelector('.items');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addCartEvent = section
  .appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  addCartEvent.addEventListener('click', () => {    
    getId(sku);
  });

  sectionPai.appendChild(section);
}

const adiconaProdutos = () => {
  fetchProducts('computador').then((response) => {
    response.results.forEach((produto) => createProductItemElement(produto));
  });
};
 
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = () => {
  adiconaProdutos();
};
