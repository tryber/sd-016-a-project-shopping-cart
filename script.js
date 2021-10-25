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
  console.log(event);
  event.currentTarget.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function fetchItemResults(itemId) {
  const resultado = await fetchItem(itemId);
  const sectionItens = document.querySelector('.cart__items');
  const resulcart = createCartItemElement(
    { sku: resultado.id, name: resultado.title, salePrice: resultado.price },
  );
  sectionItens.appendChild(resulcart);
  saveCartItems(sectionItens.innerHTML);
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

async function fetchProductsResults() {
  const sectionItens = document.querySelector('.items');
 sectionItens.innerHTML = '<ol class="loading"><li>Carregando</li></ol>';
  setTimeout(async () => {
    const resultado = await fetchProducts('computador');
    sectionItens.innerHTML = '';
    resultado.results.forEach((item) =>
      sectionItens.appendChild(
        createProductItemElement({ sku: item.id, name: item.title, image: item.thumbnail }),
      ));
  }, 2000);
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function startCart() {
  const cartItens = getSavedCartItems();
  const sectionItens = document.querySelector('.cart__items');
  sectionItens.innerHTML = cartItens;
  console.log(sectionItens.children);
  for (let i = 0; i < sectionItens.children.length; i += 1) {
    sectionItens.children[i].addEventListener('click', cartItemClickListener);
  }
}

window.onload = () => {
  fetchProductsResults();
  startCart();
};
