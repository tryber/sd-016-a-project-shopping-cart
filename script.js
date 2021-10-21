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

async function createComputerList() {
  const computerList = await fetchProducts('computer');

  computerList.results.forEach((computer) => {
    const skuNameImage = {
      sku: computer.id,
      name: computer.title,
      image: computer.thumbnail,
    };
    const itemListElement = document.querySelector('.items');
    const createSection = createProductItemElement(skuNameImage);
    itemListElement.appendChild(createSection);
  });
}

async function addItemToCart(event) {
  const eventSection = event.target.parentElement;
  const fetchItemData = await fetchItem(getSkuFromProductItem(eventSection));
  
  const skuNameSalePrice = {
    sku: fetchItemData.id,
    name: fetchItemData.title,
    salePrice: fetchItemData.price,
  };
  
  const newLiItem = createCartItemElement(skuNameSalePrice);
  const elementFather = document.querySelector('.cart__items');
  elementFather.appendChild(newLiItem);
}

async function addListenersToButtons() {
  await createComputerList();
  const buttonsAddToCart = document.querySelectorAll('.item__add');
  buttonsAddToCart.forEach((button) => {
    button.addEventListener('click', addItemToCart);
  });
}

window.onload = () => {
  createComputerList();
  addListenersToButtons();
};
