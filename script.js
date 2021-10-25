function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const element = event.target;
  element.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function handleClick(event) {
  const sku = event.target.id;
  const itemInfo = await fetchItem(sku);

  const { title: name, price: salePrice } = itemInfo;
  const cartElement = createCartItemElement({ sku, name, salePrice });
  const cartList = document.getElementsByClassName('cart__items')[0];
  cartList.appendChild(cartElement);
}

function createCustomElement(element, className, innerText, id) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', handleClick);
    e.id = id;
  }
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', sku));

  return section;
}

function createProductList(data) {
  const items = document.getElementsByClassName('items')[0];
  const products = data.results;

  products.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const productElement = createProductItemElement({ sku, name, image });
    items.appendChild(productElement);
  });
}

window.onload = async () => {
  const products = await fetchProducts('computador');
  createProductList(products);
};
