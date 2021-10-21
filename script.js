const cartItem = document.querySelector('.cart__items');

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

// eventlistener para remover produtos do carrinho
function cartItemClickListener(element) {

}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createCartButton(id) {
  const b = document.createElement('button');
  b.className = 'item__add';
  b.innerText = 'Adicionar ao carrinho';
  
  b.addEventListener('click', async () => {
    const item = await fetchItem(id);
    const { id: sku, title: name, price: salePrice } = item;
    cartItem.appendChild(createCartItemElement({ sku, name, salePrice }));
  });

  return b;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCartButton(sku));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function searchProducts(query) {
  await fetchProducts(query)
    .then((value) => value.results
    .forEach((product) => {
      const { id: sku, title: name, thumbnail: image } = product;
      const itens = document.querySelector('.items');
      itens.appendChild(createProductItemElement({ sku, name, image }));
    }));
}

window.onload = () => { 
  searchProducts('computador');
};
