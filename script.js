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

function updatePriceCart() {
  const finalPrice = document.querySelector('.total-price');
  const itemList = localStorage.getItem('cartItems');
  let sum = 0;
  if (itemList) {
    const idWithSKU = itemList.split('<li class="cart__item">');
    for (i = 1; i < idWithSKU.length; i += 1) {
      const semiPrice = ((idWithSKU)[i].split(' PRICE: $'));
      const price = (semiPrice[1].split('</li>')[0]);
      sum += parseFloat(price);
    }
  }
  if (sum === 0) finalPrice.innerHTML = '0';
  if (sum !== 0) finalPrice.innerHTML = Number(sum.toFixed(2));
}

function cartItemClickListener(event) {
  const parent = event.target.parentNode;
  event.target.remove();
  saveCartItems(parent.innerHTML);
  updatePriceCart();
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
  updatePriceCart();
}

function receiveClick() {
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('item__add')) {
      addToCart(event.target.parentNode.firstChild);
      updatePriceCart();
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
    updatePriceCart();
  });
}

function createTotalPrice() {
  const cartSection = document.querySelector('.cart');
  const totalPrice = document.createElement('span');
  totalPrice.innerHTML = 'Subtotal: R$ 0,00';
  totalPrice.className = 'total-price';
  cartSection.appendChild(totalPrice);
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
  createPage('computador')
  .then(() => {
    render();
  })
  .then(() => {
    createTotalPrice();
    updatePriceCart();
  })
  .then(() => {
  receiveClick();
  emptyCart();
  });
};