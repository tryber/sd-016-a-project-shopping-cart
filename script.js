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

async function cartItemClickListener(event) {
  if (event.target.classList.contains('item__add')) {
    const itemCard = event.target.parentElement;
    const pureitemId = `${itemCard.firstElementChild.innerText}`;
    const itemId = pureitemId.toString();
    const acquiredData = await fetchItem(itemId);
    const { id: sku, title: name, price: salePrice } = acquiredData;
    const cartItemsList = document.querySelector('.cart__items');
    const selectedItemElement = createCartItemElement({ sku, name, salePrice });
    cartItemsList.appendChild(selectedItemElement);
  } 
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
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

window.onload = () => {
  getResultFromFetchProducts('computador');
  document.addEventListener('click', cartItemClickListener);
};
