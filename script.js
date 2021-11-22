const cartList = document.querySelector('.cart__items');
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
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function createCardItem(click) {
  const id = click.path[1].childNodes[0].innerText;
  const resultItens = await fetchItem(id);
  const cardItens = {
    sku: resultItens.id,
    name: resultItens.title,
    salePrice: resultItens.price,
  };
  const cartItens = createCartItemElement(cardItens);
  cartList.appendChild(cartItens);
}

async function productList(product) {
  // codigo feito com auxilio dos membros do grupo 28 de online store
  const searchProduct = await fetchProducts(product);
  const sectionItens = document.querySelector('.items');
  searchProduct.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItens.appendChild(productItem);
  });
  const addCardItem = document.querySelectorAll('.item__add');
  addCardItem.forEach((item) => {
    item.addEventListener('click', createCardItem);
  });
}

window.onload = () => {
  productList('computador');
};
