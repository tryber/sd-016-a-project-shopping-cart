function readList() {
  return document.querySelector('.cart__items');
}

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

function createProductItemElement(sku, name, image) {
  const sectionOfItems = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return sectionOfItems.appendChild(section);
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
}

function createCartItemElement(sku, name, salePrice) {
  const cartList = readList();
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return cartList.appendChild(li);
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function eventClick() {
  const cartButton = document.querySelectorAll('.item__add');
  cartButton.forEach((button) => {
    button.addEventListener('click', async (originEvent) => {
      const recoverID = originEvent.target.parentElement;
      const getSku = getSkuFromProductItem(recoverID);
      const objProduct = await fetchItem(getSku);
      const { id, title, price } = objProduct;
      createCartItemElement(id, title, price);
    });
  });
}

async function trackMercadoLivreItems() {
  const itemsTracked = await fetchProducts('computador');
  const resultOfItems = await itemsTracked.results;
  await resultOfItems.forEach((product) => {
    const { id, title, thumbnail } = product;
    createProductItemElement(id, title, thumbnail);
  });

  eventClick();
}

window.onload = () => { 
  trackMercadoLivreItems();
};