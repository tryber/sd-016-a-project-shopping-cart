// const { fetchItem } = require("./helpers/fetchItem");

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

function cartItemClickListener(event) {
  const parent = event.target.parentNode;
  event.target.remove();
  saveCartItems(parent.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const createPage = async (product) => {
  try {
    const data = await fetchProducts(product);
    const itemSection = document.querySelector('.items');
    await data.results.forEach((item) => {
      const { id: sku, title: name, thumbnail: image } = item;
      itemSection.appendChild(createProductItemElement({ sku, name, image }));
    });
  } catch (error) {
    console.log(`Ocorreu um erro: ${error}`);
  }
};

function getCartItems() {
  return document.querySelector('.cart__items');
}

async function addToCart(item) {
  const data = await fetchItem(item.innerText);
  const cartItens = getCartItems();
  cartItens.appendChild(createCartItemElement(data));
  saveCartItems(cartItens.innerHTML);
}

function receiveClick() {
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('item__add')) {
      addToCart(event.target.parentNode.firstChild);
    }
  });
}

function emptyCart() {
  const cartList = getCartItems();
  const emptyButton = document.querySelector('.empty-cart');
  emptyButton.addEventListener('click', () => {
    for (let i = cartList.children.length - 1; i >= 0; i -= 1) {
      cartList.children[i].remove();
    }
    localStorage.removeItem('cartItems');
  });
}

function render() {
  const itemList = getSavedCartItems();
  const cartSection = getCartItems();
  cartSection.innerHTML = itemList;
  const cartItems = cartSection.children;
  for (let index = 0; index < cartItems.length; index += 1) {
    cartItems[index].addEventListener('click', cartItemClickListener);
  }
}

window.onload = () => {
  createPage('computador');
  render();
  receiveClick();
  emptyCart();
};
