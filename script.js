const cartList = document.querySelector('.cart__items');
const classPrice = '.total-price';
const btnEmptyCart = document.querySelector('.empty-cart');
const loading = document.querySelector('.loading');

btnEmptyCart.addEventListener('click', () => {
  cartList.innerHTML = '';
  const price = document.querySelector(classPrice);
  price.innerHTML = 0;
  saveCartItems();
});

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const createObj = (item) => {
  const a = {
    id: item.id,
    title: item.title,
    thumbnail: item.thumbnail,
    price: item.price,
  };
  return a;
};

  // função construida com auxílio do site abaixo:
  // https://www.javascripttutorial.net/javascript-string-slice/
function lessPrice(itemText) {
  const totalPrice = (document.querySelector(classPrice));
  let totalPriceNum = parseFloat(totalPrice.innerText);
  const text = itemText.innerText;
  const price = text.slice(text.indexOf('PRICE: $') + 'PRICE: $'.length);
  const priceNum = parseFloat(price);
  totalPriceNum -= priceNum;
  totalPrice.innerText = totalPriceNum;
  localStorage.setItem('totalPriceCart', totalPrice.innerText);
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  lessPrice(event.target);
  event.target.remove();
  saveCartItems();
}

function endLoading() {
  loading.remove();
}

async function addCartList(id, func) {
  // coloque seu código aqui
  const a = await fetchItem(id);
  const b = createObj(a);
  func(b);
  saveCartItems();
}

function sumPrice(itemPrice) {
  const totalPrice = (document.querySelector(classPrice));
  let totalPriceNum = parseFloat(totalPrice.innerText);
  const itemPriceNum = parseFloat(itemPrice);
  totalPriceNum += itemPriceNum;
  totalPrice.innerText = totalPriceNum;
  localStorage.setItem('totalPriceCart', totalPrice.innerText);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  sumPrice(salePrice);
  cartList.appendChild(li);
  return li;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btnItem = createCustomElement('button', 'item__add', 'Adicionar ao carrinho');
  btnItem.addEventListener('click', async () => {
    await addCartList(sku, createCartItemElement);
  });
  section.appendChild(btnItem);
  const item = document.querySelector('.items');
  item.appendChild(section);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function getPriceSaved() {
  const cartLength = localStorage.getItem('hei');
  const totalPrice = document.querySelector(classPrice);
  if (cartLength !== null) {
    if (cartLength.length > 2) {
      const savedPrice = localStorage.getItem('totalPriceCart');
      totalPrice.innerText = savedPrice;
    } else {
      totalPrice.innerText = 0;
    }
  }
}

window.onload = () => {
  fetchProducts('computador')
    .then((data) => {
      endLoading();
      data.forEach((e) => {
        const product = createObj(e);
      createProductItemElement(product);
      });
    });
  getSavedCartItems(cartList, cartItemClickListener);
  getPriceSaved();
};
