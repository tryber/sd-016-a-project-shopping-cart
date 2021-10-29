const ol = document.querySelector('.cart__items');

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

// Implementado com a ajuda dos colegas Renan, Fabrício e Lucas.

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(ol.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  ol.appendChild(li);
}

async function addItemToCart(product) {
  const allItens = await fetchItem(product);
  const { id: sku, title: name, price: salePrice } = allItens;
  createCartItemElement({ sku, name, salePrice });
  saveCartItems(ol.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(button);
  button.addEventListener('click', () => addItemToCart(sku));
  return section;
}

// // function getSkuFromProductItem(item) {
// //   return item.querySelector('span.item__sku').innerText;
// }

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

function savedCart() {
  ol.innerHTML = getSavedCartItems();
}
ol.addEventListener('click', cartItemClickListener);

function clearList() {
  ol.innerHTML = '';
  localStorage.removeItem('cartItems');
}
document.querySelector('.empty-cart').addEventListener('click', clearList);

window.onload = () => {
  searchProducts('computador');
  savedCart();
};
