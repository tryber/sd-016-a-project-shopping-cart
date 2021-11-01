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
  const itemCart = event.target;
  localStorage.removeItem(itemCart.innerHTML);
  itemCart.parentNode.removeChild(itemCart);
}

function emptyCart() {
  const list = document.querySelector('.cart__items');
  list.innerHTML = '';
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  const clearButton = document.querySelector('.empty-cart');
  clearButton.addEventListener('click', emptyCart);
  
  return li;
}

async function addItemToCart(item) {
  const dataCart = await fetchItem(item);
  const sectionItemsToCart = document.querySelector('.cart__items');
  const product = {
    sku: dataCart.id,
    name: dataCart.title,
    salePrice: dataCart.price,
  };
  const element = sectionItemsToCart.appendChild(createCartItemElement(product));
  localStorage.setItem(element.innerHTML, JSON.stringify(product));
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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');  
  searchData.results.forEach((element) => {
    itemObject = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    // const { id: sku, title: name, thumbnail: image } = element;
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

window.onload = () => {
  searchProducts('computador');
 };
