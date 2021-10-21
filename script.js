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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const displayOnScreen = async () => {
  const data = await fetchProducts('computador');
  data.results.forEach((element) => {
    const itemsSection = document.querySelector('.items');
    const { id, title, thumbnail } = element;
    const section = createProductItemElement({ id, title, thumbnail });
    itemsSection.appendChild(section);
  });
};

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addToCart = async (itemId) => {
  const data = await fetchItem(itemId);
  const cartContainer = document.querySelector('.cart__items');
  const { id, title, price } = data;
  const listItem = createCartItemElement({ id, title, price });
  cartContainer.appendChild(listItem);
  console.log(listItem);
};

const addButton = () => {
  const storeItem = document.querySelectorAll('.item__add');
  storeItem.forEach((element) => {
    element.addEventListener('click', (evt) => {
      const itemNode = evt.target.parentNode.firstChild.innerHTML;
      addToCart(itemNode);
    });
  });
}; 

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

window.onload = () => { 
  displayOnScreen()
    .then(() => { addButton(); })
      .then(() => {

      });
};
