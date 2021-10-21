const sectionItems = document.querySelector('.items');
const olCart = document.querySelector('.cart__items');

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
  saveCartItems('cartItems', olCart.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const itemAdd = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  itemAdd.addEventListener('click', () =>
    fetchItem(sku).then((item) => {
      olCart.appendChild(
        createCartItemElement({
          sku: item.id, name: item.title, salePrice: item.price,
        }),
      );
      saveCartItems('cartItems', olCart.innerHTML);
    }));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(itemAdd);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = () => {
  fetchProducts('computador').then((res) => {
    res.results.forEach(
      (produt) => sectionItems.appendChild(
        createProductItemElement(
        { sku: produt.id, name: produt.title, image: produt.thumbnail },
        ),
      ),
    );
  });
  olCart.innerHTML = getSavedCartItems('cartItems');
  document.addEventListener('click', (event) => {
    if (event.target.className === 'cart__item') {
      event.target.remove();
    }
  });
};
