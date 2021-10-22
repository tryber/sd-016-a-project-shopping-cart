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
  // coloque seu código aqui  // usar quando for deletar os itens do carrinho
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function itemCarrinho(event) {
  const searchSKU = getSkuFromProductItem(event.target.parentNode);
  const arrayfull = await fetchItem(searchSKU);
  const ol = document.querySelector('.cart__items');
  const cart = createCartItemElement(arrayfull);
  ol.appendChild(cart);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', itemCarrinho);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(button);

  return section;
}

const fetchObject = async () => {
  const arrayfull = await fetchProducts('computador');
  arrayfull.results.forEach((arr) => {
    const section = document.querySelector('.items');
    const result = createProductItemElement(arr);
    section.appendChild(result);
  });
};

window.onload = () => {
  fetchObject();
};