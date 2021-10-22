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

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addCartItem(id) {
  const product = await fetchItem(id);
  cartList.appendChild(createCartItemElement(product));
  saveCartItems(cartList.innerHTML);
  /* 
  requisito feito em uma sala de estudos
  Auxiliado por: Renan Souza, Matheus Benini, Vitor Brandão, Italo Moraes, Ju Barcelos e Rafael Feliciano
  */
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const sectionItems = document.querySelector('.items');
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => {
    addCartItem(sku);
  });
  section.appendChild(button);
  sectionItems.appendChild(section);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function listProducts(searchUser) {
  return fetchProducts(searchUser)
  .then((data) =>
  data.results.forEach((product) => {
  createProductItemElement(product);
  }));
  /* Requisito feito durante uma sala de estudos.
   Auxiliado por: Renan Souza, Matheus Benini, Vitor Brandão, Fabrício Martins e Rafael Feliciano */
}

function restoreCart() {
  cartList.innerHTML = getSavedCartItems();
  Array.from(cartList.children).forEach((item) =>
  item.addEventListener('click', cartItemClickListener));
}

window.onload = () => {
  listProducts('computador');
  restoreCart();
};
