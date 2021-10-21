const locateCartSection = () => document.querySelector('.cart__items');

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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function checkTotalPrice() {
  const cart = locateCartSection();
  const totalPriceSpan = document.querySelector('.total-price');
  const cartChildren = cart.children;
  if (cartChildren.length > 0) {
    let totalPrice = 0;
    for (let index = 0; index < cartChildren.length; index += 1) {
      const currentChild = cartChildren[index];
      const salePrice = Number(currentChild.className);
      totalPrice += salePrice;
      totalPriceSpan.innerHTML = `Valor total: R$ ${totalPrice}`;
    }
  } else {
    totalPriceSpan.innerHTML = 'Valor total: R$ 0';
  }
}

function cartItemClickListener(event) {
  const parent = event.target.parentNode;
  parent.removeChild(event.target);
  checkTotalPrice();
  saveCartItems(parent.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.className = `${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemsToScreen() {
  const data = await fetchProducts('computador');

  data.results.forEach((r) => {
    const itemsSection = document.querySelector('.items');
    const sku = r.id;
    const name = r.title;
    const image = r.thumbnail;
    const section = createProductItemElement({ sku, name, image });
    itemsSection.appendChild(section);
  });
}

function createTotalPriceSpan() {
  const cart = document.querySelector('.cart');
  const totalPriceSpan = document.createElement('span');
  totalPriceSpan.className = 'total-price';
  totalPriceSpan.innerHTML = 'Valor total: R$ 0';
  cart.appendChild(totalPriceSpan);
}

async function addItemsToCart(id) {
  const data = await fetchItem(id);

  const cartSection = locateCartSection();
  const sku = data.id;
  const name = data.title;
  const salePrice = data.price;
  const li = createCartItemElement({ sku, name, salePrice });
  cartSection.appendChild(li);
  checkTotalPrice();
  saveCartItems(cartSection.innerHTML);
}

function addEventListenerToProductButtons() {
  const addToCartButtons = document.querySelectorAll('.item__add');
  addToCartButtons.forEach((e) => {
    e.addEventListener('click', (event) => {
      const currentId = event.target.parentNode.firstChild.innerHTML;
      addItemsToCart(currentId);
    });
  });
}

function deleteCartItems() {
  const deleteButton = document.querySelector('.empty-cart');
  deleteButton.addEventListener('click', () => {
    const cart = locateCartSection();
    cart.innerHTML = '';
    checkTotalPrice();
  });
}

window.onload = () => {
  addItemsToScreen()
    .then(() => { addEventListenerToProductButtons(); })
    .then(() => {
      const itemList = getSavedCartItems();
      const cartSection = locateCartSection();
      cartSection.innerHTML = itemList;
      const cartItems = cartSection.children;
      for (let index = 0; index < cartItems.length; index += 1) {
        cartItems[index].addEventListener('click', cartItemClickListener);
      }
    })
    .then(() => {
      createTotalPriceSpan();
      checkTotalPrice();
    })
    .then(() => deleteCartItems());
};
