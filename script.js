const selectItem = document.querySelector('.cart__items');

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
 saveCartItems(selectItem.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemsToCart(idProduct) {
  const searchData = await fetchItem(idProduct);
  const { id: sku, title: name, price: salePrice } = searchData;
  const getCartItems = createCartItemElement({ sku, name, salePrice });
  selectItem.appendChild(getCartItems);
  saveCartItems(selectItem.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const createButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  createButton.addEventListener('click', () => {
    addItemsToCart(sku);
  });
  section.appendChild(createButton);

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// Feito com o auxilio do vídeo gravado pelo Instrutor Bernardo Salgueiro.
async function searchProducts(product) {
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
}

function restoreCartItems() {
selectItem.innerHTML = getSavedCartItems();
selectItem.addEventListener('click', cartItemClickListener);
}

window.onload = () => {
  searchProducts('computador');
  restoreCartItems();
};
