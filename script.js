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

function clearShoppingCart() {
  const ol = document.querySelector('.cart__items');
  ol.innerHTML = '';
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);

  const clearButton = document.querySelector('.empty-cart');
  clearButton.addEventListener('click', clearShoppingCart);

  return li;
}

async function addItemToCart(item) {
  const loadItem = await fetchItem(item);
  const ol = document.querySelector('.cart__items');
  const { id: sku, title: name, price: salePrice } = loadItem;
  const li = createCartItemElement({ sku, name, salePrice });
  ol.appendChild(li);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const createButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(createButton);
  createButton.addEventListener('click', () => addItemToCart(sku));

  return section;
}

// function getTotalPrice() {
//   const ol = document.querySelector('.cart__items');
  
// }

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const carregando = document.querySelector('.loading');
  carregando.remove();
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
      sectionItems.appendChild(productItem);
      // getTotalPrice();
  });
}

window.onload = () => {
  searchProducts('computador');
};
