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

async function addProducts(click) {
  const id = click.path[1].childNodes[0].innerText;
  const getID = await fetchItem(id);
  const oList = document.querySelector('.cart__items');
  const { id: sku, title: name, price: salePrice } = getID;
  const newObject = {
    sku,
    name,
    salePrice,
  };
  const item = createCartItemElement(newObject);
  item.addEventListener('click', cartItemClickListener);
  oList.appendChild(item);
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
  const button = document.querySelectorAll('.item__add');
  button.forEach((item) => {
    item.addEventListener('click', addProducts);
  });
}

window.onload = () => {
  searchProducts('computador');
};
