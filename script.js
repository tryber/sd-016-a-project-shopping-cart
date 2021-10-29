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
  event.target.remove(event);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
async function addItem(id) {
  const searchItem = await fetchItem(id);
  console.log(searchItem);
  const { id: sku, title: name, price: salePrice } = searchItem;
  const itemObject = createCartItemElement({ sku, name, salePrice });
  const sectionCart = document.querySelector('.cart__items');
  sectionCart.appendChild(itemObject);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addElement = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addElement.addEventListener('click', () => {
    addItem(sku);
  });
  section.appendChild(addElement);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function removeLoading() {
  const loading = document.querySelector('.loading');
  loading.remove();
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  console.log(searchData);
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
  removeLoading();
}

function clearCart() {
  const clearList = document.querySelector('.empty-cart');
  const sectionCart = document.querySelector('.cart__items');
  clearList.addEventListener('click', () => {
    sectionCart.innerHTML = '';
    localStorage.removeItem('cartItems');
  });
}

window.onload = () => {
  searchProducts('computador');
  clearCart();
 };
