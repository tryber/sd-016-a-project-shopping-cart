const sectionItems = document.querySelector('.items');

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
  event.target.remove();
  if (orderList.innerHTML !== null) saveCartItems(orderList.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const productById = async (idProduct) => {
  const itemObjeto = await fetchItem(idProduct);
  const { id: sku, title: name, price: salePrice } = itemObjeto;
  const paramItem = { sku, name, salePrice };
  orderList.appendChild(createCartItemElement(paramItem));
  saveCartItems(orderList.innerHTML);
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const result = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  result.addEventListener('click', () => {
    productById(id);
  });
  section.appendChild(result);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const fetchFunctions = (item) => {
  fetchProducts(item)
    .then((promisse) => promisse.forEach(({ id, title, thumbnail }) => {
      const obj = { sku: id, name: title, image: thumbnail };
      sectionItems.appendChild(createProductItemElement(obj));
    }));
};

function getSavedWithListenner() {
  listOl.innerHTML = getSavedCartItems('lista');
  if (listOl.innerHTML === null) return [];
  document.querySelectorAll('li').forEach((listItem) => {
    listItem.addEventListener('click', cartItemClickListener);
  });
}

window.onload = () => {
  fetchFunctions('computador');
  getSavedWithListenner();
};
