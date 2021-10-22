const itemElement = document.querySelector('.cart__items');

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
   return event;
}
cartItemClickListener();

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addToCart(id) {
  const addItem = await fetchItem(id);
  const addItemToCart = createCartItemElement(addItem);
  itemElement.appendChild(addItemToCart);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonAddCart = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonAddCart.addEventListener('click', () => addToCart(sku));
  section.appendChild(buttonAddCart);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
getSkuFromProductItem();

// Feito através do vídeo do Bê
async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItem = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItem.appendChild(productItem);
  });
}

window.onload = () => { 
  searchProducts('computador');
};
