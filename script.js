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
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
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

async function showFetchProducts(itemProduct) {
  const items = document.querySelector('.items');
  const getData = await fetchProducts(itemProduct);
  console.log(getData);
  getData.results.forEach((product) => {
    const productObj = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    const objCreated = createProductItemElement(productObj);
    items.appendChild(objCreated);
  });
}

async function addToCart(idItem) {
  const cartItem = document.querySelector('.cart__items');
  const fetchItemContainer = await fetchItem(idItem);
  const infoProductObj = {
      sku: fetchItemContainer.id,
      name: fetchItemContainer.title,
      salePrice: fetchItemContainer.price,
    };
  const forTheCart = createCartItemElement(infoProductObj);
  cartItem.appendChild(forTheCart);
  console.log(fetchItemContainer);
}

const buttonForAdd = () => {
  const itemToStore = document.querySelectorAll('.item__add');
  itemToStore.forEach((product) => {
    product.addEventListener('click', (event) => {
      const productToAdd = event.target.parentNode.firstChild.innerHTML;
      addToCart(productToAdd);
    });
  });
};

window.onload = () => {
  showFetchProducts('computador')
  .then(() => buttonForAdd());
};