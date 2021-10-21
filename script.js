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
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addToCart(sku) {
  const productClicked = await fetchItem(sku);
  const { title: name, price: salePrice } = productClicked;
  const getOl = document.querySelector('.cart__items');
  getOl.appendChild(createCartItemElement({ sku, name, salePrice }));
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  
  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addButton.addEventListener('click', () => addToCart(sku));
  section.appendChild(addButton);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function buildProductItem() {
  const productsList = await fetchProducts('computador');
  const getSection = document.querySelector('.items');
  productsList.forEach((elem) => {
    const productObject = {
      sku: elem.id,
      name: elem.title,
      image: elem.thumbnail,
    };
    const element = createProductItemElement(productObject);
    getSection.appendChild(element);
  });
}

window.onload = async () => {
  await buildProductItem();
};
