const ol = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const emptyCart = document.querySelector('.empty-cart');

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
  const item = event.target;
  const itemPrice = item.innerText.split('PRICE: $')[1];
  item.remove();
  totalPrice.innerText = (Number(totalPrice.innerText) - Number(itemPrice));
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  totalPrice.innerText = (Number(totalPrice.innerText) + Number(salePrice));
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function selectProduct(product) {
  const selectedData = await fetchItem(product);

  const itemSelected = {
    sku: selectedData.id,
    name: selectedData.title,
    salePrice: selectedData.price,
  };

  const selectedItem = createCartItemElement(itemSelected);
  ol.appendChild(selectedItem);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  const title = createCustomElement('span', 'item__title', name);
  const img = createProductImageElement(image);
  const id = createCustomElement('span', 'item__sku', sku);
  section.className = 'item';

  section.appendChild(id);
  section.appendChild(title);
  section.appendChild(img);
  section.appendChild(btn);
  btn.addEventListener('click', function () {
    selectProduct(id.innerText);
  });
  return section;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItem = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };

    const productItem = createProductItemElement(itemObject);
    sectionItem.appendChild(productItem);
  });
}

function clearCart() {
  ol.innerHTML = '';
  totalPrice.innerHTML = 0;
}
emptyCart.addEventListener('click', clearCart);

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = () => {
  searchProducts('computador');  
 };
