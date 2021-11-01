// requisito executado com o auxilio do vídeo e mentoria de Bernando, mentoria de Humberto Castro
// const cartItemsList = document.querySelector('cart__items');

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
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addCartItem(id) {
  const searchproduct = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = searchproduct;
  const itemBuy = createCartItemElement({ sku, name, salePrice });
  const setionCart = document.querySelector('.cart__items');
  setionCart.appendChild(itemBuy);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addButton.addEventListener('click', () => {
    addCartItem(sku);
  });
  section.appendChild(addButton);
   return section;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
   const itemCase = { sku: item.id, name: item.title, image: item.thumbnail };
   const productCase = createProductItemElement(itemCase);
   sectionItems.appendChild(productCase);
  });
 }

function clearCart() {
  const clearList = document.querySelector('.empty-cart');
  const sectionCart = document.querySelector('.cart__items');
  clearList.addEventListener('click', () => {
    sectionCart.innerHTML = '';
    localStorage.removeItem('allItems');
  });
}

window.onload = () => {
  searchProducts('computador');
  clearCart();
};
