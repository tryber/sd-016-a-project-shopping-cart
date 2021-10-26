const containerObj = [];
const cartItem = document.querySelector('.cart__items');
const buttonClear = document.querySelector('.empty-cart');
const priceAll = document.querySelector('.total-price');
const verify = Object.keys(localStorage);

// if (verify.length > 0) {
//   const recoveryValue = JSON.parse(localStorage.getItem('totalPrice'));
//   priceAll.innerText = recoveryValue.totalPrice;
// } else {
//   priceAll.innerText = 0;
// }

buttonClear.addEventListener('click', () => {
  cartItem.innerHTML = '';
  localStorage.clear();
});

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

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (e) => {
    const totalValue = parseFloat(priceAll.innerText);
    console.log(typeof totalValue);
    // set no localstorage
    const clickValue = parseFloat(e.target.innerText.split('$')[1]);
    const totalV = { totalPrice: priceAll.innerText = totalValue - clickValue };
    priceAll.innerText = totalValue - clickValue;
    localStorage.setItem('totalPrice', JSON.stringify(totalV));
    e.target.remove(); 
  });
  return li;
}
function addToCart(evt) {
  const { parentElement } = evt.target;
  const idFind = parentElement.childNodes[0].innerText;
  fetchItem(idFind).then((data) => {
    const { id: sku, title: name, price: salePrice } = data;
    const objResult = { sku, name, salePrice };
    cartItem.appendChild(createCartItemElement(objResult));
    containerObj.push(objResult);
    saveCartItems(JSON.stringify(containerObj));

    const restore = JSON.parse(getSavedCartItems());
    const allPrices = [];
    restore.map((el) => allPrices.push(parseFloat(el.salePrice)));
    const total = allPrices.reduce((acc, value) => acc + value, 0);
    priceAll.innerText = total; 
    const totalValue = { totalPrice: priceAll.innerText };
    localStorage.setItem('totalPrice', JSON.stringify(totalValue));
    });
}

function cartItemClickListener(event) {
  addToCart(event);
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product).then((data) => data);
  const sectionItems = document.querySelector('.items');
  const { results } = searchData;
  results.forEach((item) => {
    const { id: sku, title: name, thumbnail: image } = item;
    const itemObject = { 
      sku,
      name,
      image,
    }; 
    const productItem = createProductItemElement(itemObject);
    const buttonEl = productItem.childNodes[3];
    buttonEl.addEventListener('click', cartItemClickListener);
    sectionItems.appendChild(productItem);
  });
}

const recoveryData = () => {
   const dataRecovery = JSON.parse(getSavedCartItems());
   if (dataRecovery) {
     dataRecovery.forEach((product) => cartItem.appendChild(createCartItemElement(product)));
    }
};
const body = document.querySelector('body');
const loading = document.querySelector('.loading');
window.onload = async () => { 
  await searchProducts('computador').then((data) => {
    if (body.firstChild !== loading) {
      body.removeChild(loading);
    }
  return data;
  });
  recoveryData();
};