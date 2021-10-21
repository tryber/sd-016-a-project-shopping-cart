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
}
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function searchProduct(product) {
  const selectItens = document.querySelector('.items');
  fetchProducts(product).then((data) => {
      data.results.forEach((element) => {
      const { id: sku, title: name, thumbnail: image } = element;
      selectItens.appendChild(createProductItemElement({ sku, name, image }));
      });
    })
}

function carrinhoProduct(item = "MLB1937082776") {
  const itemList = document.querySelector(".cart__items")
  fetchItem(item).then((data) => {
      const { id: sku, title: name, price: salePrice } = data;
      itemList.appendChild(createCartItemElement({ sku, name, salePrice }));
    })
}

window.onload = () => {
  searchProduct('computador');
  carrinhoProduct()

 };
