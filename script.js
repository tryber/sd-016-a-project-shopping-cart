const sumItems = document.querySelector('.total-price');
const listItems = document.querySelector('.cart__items');

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
  const itemSelected = event.target;
  const text = itemSelected.innerText.split(' ');
  let number = text[text.length - 1];
  number = number.split('').filter((e) => Number(e) || e === '.' || e === '0').join('');
  sumItems.innerText = (parseFloat(sumItems.innerText * 100) - parseFloat(number * 100)) / 100;
  localStorage.setItem('price', sumItems.innerText);
  itemSelected.remove();
  saveCartItems(listItems.innerHTML);
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

function createCartItemElement({ sku, name, salePrice, thumbnail }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.style.listStyleImage = `url(${thumbnail})`;
  sumItems.innerText = (parseFloat(sumItems.innerText * 100) + parseFloat(salePrice * 100)) / 100;
  localStorage.setItem('price', sumItems.innerText);
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function cartProduct(event) {
  const productId = event.target.parentNode;
  const id = getSkuFromProductItem(productId);
  const data = await fetchItem(id);
  const { id: sku, title: name, price: salePrice, thumbnail } = data;
  const item = createCartItemElement({ sku, name, salePrice, thumbnail });
  listItems.appendChild(item);
  saveCartItems(listItems.innerHTML);
}

function searchProduct(product = 'computador') {
  const selectItens = document.querySelector('.items');
  fetchProducts(product).then((data) => {
      data.results.forEach((element) => {
      const { id: sku, title: name, thumbnail: image } = element;
      selectItens.appendChild(createProductItemElement({ sku, name, image }));
      const itens = document.querySelectorAll('.item__add');
      itens.forEach((item) => {
        item.addEventListener('click', cartProduct);
      });
    });
    });
}

const returnItemsCart = () => {
  sumItems.innerHTML = localStorage.getItem('price');
  listItems.innerHTML = getSavedCartItems();
  Object.values(listItems.children)
    .forEach((li) => li.addEventListener('click', cartItemClickListener));
};

function clearCart() {
  const clear = document.querySelector('.empty-cart');
  clear.addEventListener('click', () => {
    listItems.innerHTML = '';
    sumItems.innerText = '0';
    localStorage.setItem('price', sumItems.innerText);
    saveCartItems(listItems.innerHTML);
  });
}

window.onload = () => {
};

window.onload = () => {
  clearCart();
  searchProduct();
  returnItemsCart();
};
