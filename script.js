const sectionItems = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');

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
  saveCartItems(cartItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: R$${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Referencia ao diretório do João Vitor Spala https://github.com/tryber/sd-016-a-project-shopping-cart/pull/115/commits/d5718252a8084033a8f1b701749b8d6beb0f9cc8
async function cartItem(event) {
  if (event.target.classList.contains('item__add')) {
    const itemCard = event.target.parentElement;
    const id = `${itemCard.firstElementChild.innerText}`.toString();

  const idResponse = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = idResponse;
  cartItems.appendChild(createCartItemElement({ sku, name, salePrice }));
  saveCartItems(cartItems.innerHTML);
  }
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

// Referencias ao vídeo do Bê (Bernardo Salgueiro)
async function searchProduct(product) {
  const searchResponse = await fetchProducts(product);
  searchResponse.results.forEach((item) => {
    const { id: sku, title: name, thumbnail: image } = item;

    sectionItems.appendChild(createProductItemElement({ sku, name, image }));
  });
}

window.onload = () => {
  searchProduct('computador');
  document.addEventListener('click', cartItem);
};
