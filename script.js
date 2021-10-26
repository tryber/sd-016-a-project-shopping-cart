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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  return li;
}

async function getSelectedItemInfo(selectedItem) {
  const itemCard = selectedItem.parentElement;
  const itemId = getSkuFromProductItem(itemCard);
  const acquiredData = await fetchItem(itemId);
  console.log(acquiredData);
  return acquiredData;
}

function updateCartList(newItem) {
  const cartItemsList = document.querySelector('.cart__items');
  cartItemsList.appendChild(newItem);
  saveCartItems(cartItemsList.innerHTML);
}

async function itemClickListener(event) {
  if (event.target.classList.contains('item__add')) {
    const itemData = await getSelectedItemInfo(event.target);
    const { id: sku, title: name, price: salePrice } = itemData;
    const selectedItemCartElement = createCartItemElement({ sku, name, salePrice });
    updateCartList(selectedItemCartElement);
  }

  if (event.target.classList.contains('cart__item')) {
    const cartList = event.target.parentElement;
    const selectedItem = event.target;
    cartList.removeChild(selectedItem);
    saveCartItems(cartList.innerHTML);
  }
}

async function getResultFromFetchProducts(product) {
  const acquiredData = await fetchProducts(product);
  const itemsSection = document.querySelector('.items');
  acquiredData.results.forEach((result) => {
    const { id: sku, title: name, thumbnail: image } = result;
    const returnedItemElement = createProductItemElement({ sku, name, image });
    itemsSection.appendChild(returnedItemElement);
  });
}

function reloadCartList(storedData) {
  if (storedData) {
  const cartItemsList = document.querySelector('.cart__items');
  cartItemsList.innerHTML = storedData;
  }
}

function emptyCartList() {
  const cartList = document.querySelector('.cart__items');
  cartList.innerHTML = '';
}

window.onload = () => {
  const storedData = getSavedCartItems();
  reloadCartList(storedData);
  getResultFromFetchProducts('computador');
  document.addEventListener('click', itemClickListener);
  document.querySelector('.empty-cart').addEventListener('click', emptyCartList);
};
