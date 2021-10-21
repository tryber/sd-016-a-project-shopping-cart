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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  console.log(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemsToScreen() {
  const data = await fetchProducts('computador');

  data.results.forEach((r) => {
    const itemsSection = document.querySelector('.items');
    const sku = r.id;
    const name = r.title;
    const image = r.thumbnail;
    const section = createProductItemElement({ sku, name, image });
    itemsSection.appendChild(section);
  });
}

async function addItemsToCart(id) {
  const data = await fetchItem(id);

  const cartSection = document.querySelector('.cart__items');
  const sku = data.id;
  const name = data.title;
  const salePrice = data.price;
  const li = createCartItemElement({ sku, name, salePrice });
  cartSection.appendChild(li);
}

function addEventListenerToProductButtons() {
  const addToCartButtons = document.querySelectorAll('.item__add');
  addToCartButtons.forEach((e) => {
    e.addEventListener('click', (event) => {
      const currentId = event.target.parentNode.firstChild.innerHTML;
      addItemsToCart(currentId);
    });
  });
}

window.onload = () => {
  addItemsToScreen()
    .then(() => { addEventListenerToProductButtons(); });
};
