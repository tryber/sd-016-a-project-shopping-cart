function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText; // Cria um elemento html;
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
  const olItems = document.querySelector('.cart__items');
  olItems.removeChild(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addCartItems(id) {
  const item = await fetchItem(id);
  const object = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  const li = createCartItemElement(object);
  const ol = document.querySelector('.cart__items');
  ol.appendChild(li);
}

async function addProducts(product) {
  const searchProducts = await fetchProducts(product);
  searchProducts.results.forEach((item) => {
   const objectItem = {
     sku: item.id,
     name: item.title,
     image: item.thumbnail,
   };
   const sectionProduct = createProductItemElement(objectItem);
   const section = document.querySelector('.items');
   section.appendChild(sectionProduct);
   addCartItems(objectItem.sku);
  });
 }

window.onload = () => { addProducts('computador'); };
