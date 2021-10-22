const list = document.querySelector('.cart__items');

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
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function buildCarItem(sku) {
  const itemList = await fetchItem(sku);
  const { title: name, price: salePrice } = itemList;
  list.appendChild(createCartItemElement({ sku, name, salePrice }));
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => buildCarItem(sku));
  section.appendChild(button);
  return section;
}

// Código elaborado com a ajuda do Ricardo Carvalho, Turma 16A For(ever).
async function buildProductItem(product) {
  const getSection = document.querySelector('.items');
  const productsList = await fetchProducts(product);
  productsList.forEach((element) => {
    const productObj = { 
      sku: element.id, 
      name: element.title, 
      image: element.thumbnail,
    };
        const items = createProductItemElement(productObj);
    getSection.appendChild(items);
  });
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = async () => {
  await buildProductItem('computador');
 };
