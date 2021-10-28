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

const itemsElement = document.querySelector('.cart__items');

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(itemsElement.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemInCart(sku) {
  const items = await fetchItem(sku);
  const { title: name, price: salePrice, thumbnail: image } = items;
  createCartItemElement({ sku, image, name, salePrice });
  saveCartItems(itemsElement.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addButton.addEventListener('click', () => {
    saveCartItems(itemsElement.innerHTML);
    addItemInCart(sku);
  });
  section.appendChild(addButton);
  return section;
}

const requireOl = document.querySelector('ol');

async function recoverProductById(id) {
  const consFetch = await fetchItem(id);
  return consFetch;
}

function auxiliar() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => button.addEventListener('click', () => {
    recoverProductById(button.parentElement.firstChild.innerText)
      .then((promise) => {
        const concatObj = {
          sku: promise.id,
          name: promise.title,
          salePrice: promise.price,
        };
        requireOl.appendChild(createCartItemElement(concatObj));
      });
  }));
}

async function searchProduct(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
  auxiliar();
}

function setSavedCart() { 
  const memory = getSavedCartItems();
  itemsElement.innerHTML = memory;
}

function cleanCart() {
  const buttonClear = document.querySelector('.empty-cart');
  const allItems = document.querySelector('.cart__items');
  // esse evento zera todo o HTML da ol com um click no botão
  buttonClear.addEventListener('click', () => {
    allItems.innerHTML = '';
  });
}
cleanCart();

window.onload = () => {
  searchProduct('computador');
  getSavedCartItems();
  setSavedCart();
};
