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

function sumPrices(cart) {
  if (cart.children.length === 0) return '';
  const listPrices = [];
  Array.from(cart.children).forEach((item) =>
    listPrices.push(parseFloat(item.innerText.split('PRICE: $')[1])));
  return listPrices.reduce((total, price) => total + price);
}

function addSumPrices(cart) {
  const totalPriceText = document.querySelector('.total-price');
  const totalSum = sumPrices(cart);
  const p = document.createTextNode(`${totalSum}`);
  totalPriceText.innerText = '';
  totalPriceText.appendChild(p);
}

function cartItemClickListener(event) {
  const cart = document.querySelector('ol.cart__items');
  event.target.remove();
  addSumPrices(cart);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function findProducts(product) {
  const items = document.querySelector('.items');
  await fetchProducts(product)
    .then((data) => data.results)
    .then((products) => {
      products.forEach((productItem) => {
        items.appendChild(createProductItemElement({
          sku: productItem.id,
          name: productItem.title,
          image: productItem.thumbnail,
        }));
      });
    });
}

function addItem(cart) {
  const button = document.querySelectorAll('.item__add');
  button.forEach((b) => { // b = button
    b.addEventListener('click', async () => {
      const getId = b.parentNode.firstChild.innerText; // get element id
      await fetchItem(getId)
        .then((result) => {
          const resultProduct = createCartItemElement({
            sku: result.id,
            name: result.title,
            salePrice: result.price,
          });
          cart.appendChild(resultProduct);
        });
      saveCartItems(cart.innerHTML);
      addSumPrices(cart);
    });
  });
}

window.onload = async () => {
  const cartItems = document.querySelector('ol.cart__items');
  cartItems.addEventListener('click', () => {
    saveCartItems(cartItems.innerHTML);
  });
  await findProducts('computador');
  getSavedCartItems();
  addItem(cartItems);
};
