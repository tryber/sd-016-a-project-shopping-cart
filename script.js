// Com colaboração de Priscila Silva

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

// Elaborado com ajuda do Otávio Cantarelli

function cartItemClickListener(event, sku, price) {
  const div = document.querySelector('.total-price');
  const findElement = cartItems.find((item) => item.sku === sku);
  const findIndexOfElement = cartItems.indexOf(findElement);
  cartItems.splice(findIndexOfElement, 1);
  saveCartItems(JSON.stringify(cartItems));

  div.innerText = (sum -= price).toPrecision();
  event.target.remove();
}

function createCartItemElement({ sku, name, price }) {
  const getOlItemElements = document.querySelector('.cart__items');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${price}`;
  getOlItemElements.appendChild(li);

  li.addEventListener('click', (event) => cartItemClickListener(event, sku, price));
}

const addItemToCart = async (sku) => {
  const allItens = await fetchItem(sku);
  const { title: name, price } = allItens;
  createCartItemElement({ sku, name, price });
};

function createProductItemElement({ sku, name, image, price }) {
  const buttonAddToCart = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  const section = document.createElement('section');
  const productSection = document.querySelector('.items');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const div = document.querySelector('.total-price');

  buttonAddToCart.addEventListener('click', () => {
    addItemToCart(sku);
    div.innerText = (sum += price).toPrecision();
    cartItems.push({ sku, name, price });
    saveCartItems(JSON.stringify(cartItems));
  });
  section.appendChild(buttonAddToCart);
  productSection.appendChild(section);
  return section;
}

const sectionContainer = document.querySelector('.container');
const loading = document.querySelector('.loading');

const createCartItems = () => {
  fetchProducts('computador').then((productList) => {
    const sectionItems = document.querySelector('.items');
  
    for (let index = 0; index < productList.length; index += 1) {
      const currentProduct = { 
        sku: productList[index].id,
        name: productList[index].title,
        image: productList[index].thumbnail,
        price: productList[index].price,
      };
      sectionItems.appendChild(createProductItemElement(currentProduct));
    }
    sectionContainer.removeChild(loading);
  });
};

const getFromLocalStorage = () => {
  const itemsList = JSON.parse(getSavedCartItems());
  if (itemsList) {
    itemsList.forEach((item) => {
      createCartItemElement(item);
    });
  }
};

// function getSkuFromProductItem(item) {
//  return item.querySelector('span.item__sku').innerText;
// }

// function createCartItemElement({ sku, name, salePrice }) {
//  const li = document.createElement('li');
//  li.className = 'cart__item';
//  li.setAttribute('data-price', `${salePrice}`);
// li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
// li.addEventListener('click', cartItemClickListener);
//  const removeTudo = document.querySelector('.empty-cart');
//  removeTudo.addEventListener('click', removerCarrinho);
//  totalpreço += salePrice;
//  preçosalvo.innerHTML = totalpreço;
//  return li;
// }

window.onload = () => {
  const btnClearCart = document.querySelector('.empty-cart');

  createCartItems();
  getFromLocalStorage();
  btnClearCart.addEventListener('click', clearLocalStorage);
  divTotalPrice();
};