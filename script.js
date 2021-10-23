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
  // coloque seu código aqui
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice, thumbnail }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.style.listStyleImage = `url(${thumbnail})`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function cartProduct(event) {
  const product = event.target;
  const productId = product.parentNode;
  const id = getSkuFromProductItem(productId);
  const data = await fetchItem(id);
  const itemList = document.querySelector('.cart__items');
  const { id: sku, title: name, price: salePrice, thumbnail } = data;
  const item = createCartItemElement({ sku, name, salePrice, thumbnail });
  itemList.appendChild(item);
}

function searchProduct(product = 'computador') {
  const selectItens = document.querySelector('.items');
  fetchProducts(product).then((data) => {
      data.results.forEach((element) => {
      const { id: sku, title: name, thumbnail: image } = element;
      selectItens.appendChild(createProductItemElement({ sku, name, image }));
      const itens = document.querySelectorAll('.item__add');
      itens.forEach((item) => {
        item.addEventListener('click', cartProduct);
      });
    });
    });
}

function cleanButton() {
  const clear = document.querySelector('.empty-cart');
  clear.addEventListener('click', () => {
    document.querySelector('.cart__items').innerHTML = '';
  });
}
cleanButton();
searchProduct();

window.onload = () => {};
