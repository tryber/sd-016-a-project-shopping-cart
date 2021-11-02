const sectionItems = document.querySelector('.items');
const orderList = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const emptyCart = document.querySelector('.empty-cart');

let totalValue = 0;

const funcLoading = () => {
  const loading = document.createElement('h1');
  loading.classList = 'loading';
  sectionItems.appendChild(loading).innerHTML = 'carregando...';
};

const removeLoad = () => {
  const loading = document.querySelector('.loading');
  loading.remove();
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

function cartItemClickListener(event) {
  event.target.remove();
  if (orderList.innerHTML !== null) saveCartItems(orderList.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => {
    cartItemClickListener(event);
    const productPrice = +salePrice;
    totalValue -= productPrice;
    totalPrice.innerHTML = totalValue;
  });
  return li;
}
function getAllCartItems(price) {
  sumPrice(price);
}

const productById = async (idProduct) => {
  funcLoading();
  const itemObjeto = await fetchItem(idProduct);
  const { id: sku, title: name, price: salePrice } = itemObjeto;
  const paramItem = { sku, name, salePrice };
  orderList.appendChild(createCartItemElement(paramItem));
  saveCartItems(orderList.innerHTML);
  const productPrice = +salePrice;
  totalValue += productPrice;
    totalPrice.innerHTML = totalValue;
    removeLoading();
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const result = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  result.addEventListener('click', () => {
    productById(sku);
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
  orderList.innerHTML = getSavedCartItems('lista');
  if (orderList.innerHTML === null) return [];
  document.querySelectorAll('li').forEach((listItem) => {
    listItem.addEventListener('click', cartItemClickListener);
  });
}

const cleanCart = () => {
  const li = document.querySelectorAll('.cart__item');
  li.forEach((item) => item.remove());
};

window.onload = () => {
  fetchFunctions('computador');
  getSavedWithListenner();
  emptyCart.addEventListener('click', cleanCart);
};
