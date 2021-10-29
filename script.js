const itemsList = document.querySelector('.items');
const cartList = document.querySelector('.cart__items');

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui 2
}

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

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemToCart(event) {
  const { target } = event;
  const targetId = getSkuFromProductItem(target.parentNode);
  const { title, price } = await fetchItem(targetId);
  const cartItem = createCartItemElement({ sku: targetId, name: title, salePrice: price });
  cartList.appendChild(cartItem);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', addItemToCart);
  section.appendChild(button);

  return section;
}

async function createProductList(search) {
  try {
    const { results } = await fetchProducts(search);
    results.forEach((element) => {
      const { id, title, thumbnail } = element;
      itemsList.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
    });
  } catch (error) { console.log(error); }
}

window.onload = () => { createProductList('computador'); }; // retirar isso daki;
