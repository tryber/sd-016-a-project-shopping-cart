const olCartItems = document.querySelector('.cart__items');
const sectionItens = document.querySelector('.items');

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

const loadingTextMessageOn = () => {
  const loadingMessage = document.createElement('span');
  loadingMessage.className = 'loading';
  loadingMessage.innerText = 'carregando...';
  sectionItens.appendChild(loadingMessage);
};

const loadingTextMessageOff = () => {
  document.querySelector('.loading').remove();
};

const clearCartListener = () => {
  const clearBtn = document.querySelector('.empty-cart');
  clearBtn.addEventListener('click', () => {
    olCartItems.innerHTML = '';
    saveCartItems(olCartItems.innerHTML);
  });
};

const cartPrice = () => {
  const cartSection = document.querySelector('.cart');
  const totalPrice = document.createElement('span');
  totalPrice.className = 'total-price';
  const cartList = document.querySelectorAll('.cart__item');
  const priceArray = [];
  let sumPrice = 0;
  cartList.forEach((li, index) => {
    priceArray.push(li.innerText.split('PRICE: $'));
    sumPrice += parseFloat(priceArray[index][1]) * 100;
  });
  totalPrice.innerText = `${(sumPrice / 100)}`;
  const totalLabel = document.createElement('span');
  totalLabel.innerText = 'Total:';
  cartSection.appendChild(totalLabel);
  cartSection.appendChild(totalPrice);
};

const updatePrice = (price) => {
  const tagPrice = document.querySelector('.total-price');
  const currentPrice = tagPrice.innerText;

  tagPrice.innerText = `${(parseFloat(currentPrice) * 100 + parseFloat(price) * 100) / 100}`;
};

function cartItemClickListener(event) {
  let price = event.target.innerText.split('PRICE: $')[1];
  price = parseFloat(price) - (2 * parseFloat(price));
  updatePrice(price);
  event.target.remove();
  saveCartItems(olCartItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemToCart(itemId) {
  const searchedItem = await fetchItem(itemId);
  const productItemObject = {
    sku: searchedItem.id,
    name: searchedItem.title,
    salePrice: searchedItem.price,
  };
  updatePrice(searchedItem.price);
  const liCartItem = createCartItemElement(productItemObject);
  olCartItems.appendChild(liCartItem);
  saveCartItems(olCartItems.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addToCartBtn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addToCartBtn.addEventListener('click', () => {
    addItemToCart(sku);
  });
  section.appendChild(addToCartBtn);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// results.id = sku
// title = nome do produto
// thumbnail = imagem do produto
// req-01 com ajuda do Bê
async function searchProducts(product) {
  const searchedData = await fetchProducts(product);
  loadingTextMessageOff();
  searchedData.results.forEach((item) => {
    const productItemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItemElement = createProductItemElement(productItemObject);
    sectionItens.appendChild(productItemElement);
  });
}

const loadCartItems = () => {
  olCartItems.innerHTML = getSavedCartItems();
  const liCartItems = document.querySelectorAll('.cart__item');
  liCartItems.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

window.onload = () => { 
    loadingTextMessageOn();
    searchProducts('computador');
    loadCartItems();
    clearCartListener();
    cartPrice();
};
