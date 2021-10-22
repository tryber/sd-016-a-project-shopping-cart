// Codigo elaborado com a colaboração de João Victor Veidz e Priscila Silva

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

const listOl = document.querySelector('ol');

const productById = async (idProduct) => {
  const objProduct = await fetchItem(idProduct);
  const { id: sku, title: name, price: salePrice } = objProduct;
  const objParam = { sku, name, salePrice };
  listOl.appendChild(createCartItemElement(objParam));
  saveCartItems(listOl.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btn.addEventListener('click', () => {
    productById(sku);
  });
  section.appendChild(btn);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  if (listOl.innerHTML !== null) saveCartItems(listOl.innerHTML)
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const productByName = async (paramItem) => {
  const promisse = await fetchProducts(paramItem);
  promisse.forEach(({ id, title, thumbnail }) => {
    const obj = { sku: id, name: title, image: thumbnail };
    document.querySelector('.items').appendChild(createProductItemElement(obj));
  });
};

function getSavedWithListenner () {
  listOl.innerHTML = getSavedCartItems('lista');
  if (listOl.innerHTML === null) return [];
  document.querySelectorAll('li').forEach((listItem) => {
    listItem.addEventListener('click', cartItemClickListener);
  });
}

window.onload = () => {
  productByName('computador');
  getSavedWithListenner();
};
