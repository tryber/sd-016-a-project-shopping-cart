const sectionItems = document.querySelector('.items');
const olCart = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const emptyChart = document.querySelector('.empty-cart');
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

function itemRemove(elem) {
  elem.remove();
  saveCartItems(olCart.innerHTML);
  fetchItem(elem.id).then((item) => {
    totalPrice.innerText = (parseFloat(totalPrice.innerText) * 100 - item.price * 100) / 100;
  });
}

function cartItemClickListener(event) {
  itemRemove(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.id = sku;
  totalPrice.innerText = (parseFloat(totalPrice.innerText) * 100 + salePrice * 100) / 100;
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
      saveCartItems(olCart.innerHTML);
    }));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(itemAdd);
  return section;
}

function getProducts() {
  fetchProducts('computador').then((res) => {
    res.results.forEach(
      (produt) => sectionItems.appendChild(
        createProductItemElement(
        { sku: produt.id, name: produt.title, image: produt.thumbnail },
        ),
      ),
    );
    loading.remove();
  });
}

function getCartItems() {
  olCart.innerHTML = getSavedCartItems();
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      itemRemove(event.target);
    });
    fetchItem(elem.id).then((item) => {
      totalPrice.innerText = (parseFloat(totalPrice.innerText) * 100 + item.price * 100) / 100;
    });
  });
}

emptyChart.addEventListener('click', () => {
  olCart.innerHTML = '';
  saveCartItems(olCart.innerHTML);
  totalPrice.innerText = 0;
});

window.onload = () => {
  getProducts();
  getCartItems();
};
