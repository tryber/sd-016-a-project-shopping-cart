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

let localStorageArray = [];

function saveLocalStorageItems(id, operation) {
  console.log(localStorageArray);
  fetchItem(id).then((values) => {
    if (operation === 'remove') {
      localStorageArray = JSON.parse(localStorage.getItem('cartItems'));
      localStorageArray = localStorageArray.filter((object) => object.sku !== id);
      saveCartItems(localStorageArray);
    } else {
      const { id: sku, title: name, price: salePrice } = values;
      localStorageArray.push({ sku, name, salePrice });
      saveCartItems(localStorageArray);
    }

  });
}

function cartItemClickListener(event) {
  const element = event.target;
  const elementId = element.innerText.split('SKU: ')[1].split(' |')[0];
  element.remove();
  saveLocalStorageItems(elementId, 'remove')
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createItemsOnClick(event) { // adiciona os itens no carrinho
  const listContainer = document.getElementsByClassName('cart__items')[0];
  const elementId = event.target.parentNode.firstChild.innerText;
  const data = fetchItem(elementId);
  data.then((values) => {
    const { id: sku, title: name, price: salePrice } = values;
    listContainer.appendChild(createCartItemElement({ sku, name, salePrice }));
    saveLocalStorageItems(sku, 'add');
  });

}

function createProductItemElement({ sku, name, image }) {
  const htmlSection = document.getElementsByClassName('items')[0];
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', createItemsOnClick);

  htmlSection.appendChild(section);
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function createItems() {
  fetchProducts('computador').then((response) => {
    response.results.forEach((data) => {
      const { id: sku, title: name, thumbnail: image } = data;
      createProductItemElement({ sku, name, image });
    });
  });
}

function createTotalPriceElement() {
  const paragraph = document.createElement('p');
  const cart = document.getElementsByClassName('cart')[0];
  paragraph.className = 'total-price';
  paragraph.innerText = '0.00';
  paragraph.style.order = '-1';
  cart.appendChild(paragraph);
}

function getLocalStorageItems() {
  localStorageArray = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : [];
  localStorageArray.forEach((item) => {
    const { sku, name, salePrice } = item; 
    document.getElementsByClassName('cart__items')[0].appendChild(createCartItemElement({ sku, name, salePrice }));
  });
}

window.onload = () => {
  createItems();
  createTotalPriceElement();
  getLocalStorageItems();
};
