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

function cartItemClickListener(event) {
 const li = event.target;
 li.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function createItemsCart(id) {
  const olItems = document.querySelector('.cart__items');
  const requestData = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = requestData;
  const liItems = createCartItemElement({ sku, name, salePrice });
  olItems.appendChild(liItems);
}

function listenerAdd() {
  const getButtonAddToCart = document.querySelectorAll('.item__add');
  getButtonAddToCart.forEach((elementBTN, index) => {
    elementBTN.addEventListener('click', () => {
      const itemSKU = getButtonAddToCart[index].parentNode.firstElementChild.innerText;
      createItemsCart(itemSKU);
  });
  });
}

async function currentProducts(product) {
  const sectionItems = document.querySelector('.items');
  const listProducts = await fetchProducts(product);
  listProducts.results.forEach((objectProduct) => {
    const itemProduct = {
      sku: objectProduct.id,
      name: objectProduct.title,
      image: objectProduct.thumbnail,
    };
    const sectionProductsItems = createProductItemElement(itemProduct);
    sectionItems.appendChild(sectionProductsItems);
  });
  listenerAdd();
}

window.onload = () => { 
  currentProducts('computador');
};
