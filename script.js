const containerProducts = document.querySelector('.items');
const containerCartItems = document.querySelector('.cart__items');

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
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  return containerCartItems.removeChild(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const renderItemsToSreen = async () => {
  const data = await fetchProducts('computador');
  data.results.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    containerProducts.appendChild(createProductItemElement({ sku, name, image }));
  });
};

renderItemsToSreen();

const getItemApi = async (itemId) => {
  const { id: sku, title: name, price: salePrice } = await fetchItem(itemId);
    containerCartItems.appendChild(createCartItemElement({ sku, name, salePrice }));
};
 
function addItemToCart() {
  const btnAddItemToCart = document.querySelectorAll('.item__add');
  const listItem = document.querySelectorAll('.item');
  btnAddItemToCart.forEach((element, index) => {
    element.addEventListener('click', () => {
      const idItem = listItem[index].getElementsByTagName('span')[0].innerText;
      
      getItemApi(idItem);
    });
  });
}

window.onload = () => {
  addItemToCart();
};
