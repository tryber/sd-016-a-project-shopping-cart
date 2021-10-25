const cartItem = document.querySelector('.cart__items');
const emptyCart = document.querySelector('.empty-cart');
const loading = document.querySelector('.loading');

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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
 
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
    saveCartItems(cartItem.innerHTML);
    priceUpdater(id);
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
async function products(product) {
  const productData = await fetchProducts(product);
  const section = document.querySelector('.items');
  console.log(productData);
  productData.results.forEach((item) => {
    const itemObj = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productSection = createProductItemElement(itemObj);
    section.appendChild(productSection);
  });
}

window.onload = () => {
  products('computador');
};
