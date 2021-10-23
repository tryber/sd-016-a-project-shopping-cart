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
  const btAddCart = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btAddCart.addEventListener('click', () => fetchItemResults(sku));

  section.appendChild(btAddCart);

  return section;
}

async function fetchProductsResults () {
  let resultado = await fetchProducts ('computador');
  let sectionItens = document.querySelector('.items');
  resultado.results.forEach((item) => 
    sectionItens.appendChild(createProductItemElement({sku: item.id, name: item.title, image: item.thumbnail})))
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

async function fetchItemResults (itemId) {
  let resultado = await fetchItem (itemId);
  let sectionItens = document.querySelector('.cart__items');
  sectionItens.appendChild(createCartItemElement({sku: resultado.id, name: resultado.title, salePrice: resultado.price}))
}

window.onload = () => { fetchProductsResults();
 };
