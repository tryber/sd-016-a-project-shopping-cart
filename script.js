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

const cartOfTheBuy = async (id) => {
  const objOfTheItem = await fetchItem(id);
  const objItemList = {
    sku: objOfTheItem.id,
    name: objOfTheItem.title, 
    salePrice: objOfTheItem.price,
  };
  const listItem = document.querySelector('.cart__items');
  listItem.appendChild(createCartItemElement(objItemList));
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const getButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  getButton.addEventListener('click', () => cartOfTheBuy(sku));
  section.appendChild(getButton);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function getProducts(product) {
  const searchData1 = await fetchProducts(product);
  const sectionId = document.querySelector('.items');
  searchData1.results.forEach((item) => {
    const itemObj = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const objAndSection = createProductItemElement(itemObj);
    sectionId.appendChild(objAndSection);
  });
}

window.onload = () => { 
   getProducts('computador');
}; 
