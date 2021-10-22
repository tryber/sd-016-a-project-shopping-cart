// Codigo elaborado com a colaboração de João Victor Veidz e Priscila Silva

const shopCartSave = [];

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

const listOl = document.querySelector('ol');

function sumPrice(arrayNumberPrice) {
  const sumHTML = document.querySelector('.total-price');
  const sumReduce = arrayNumberPrice.reduce((sum, numberPrice) => sum + numberPrice.salePrice, 0);
   sumHTML.innerHTML = sumReduce;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event, sku) {
  event.target.remove();
  // console.log(shopCartSave, 1);
  shopCartSave.forEach((element, index) => {
    if (element.sku === sku) shopCartSave.splice(index, 1);
  });
  // console.log(shopCartSave, 2);
  sumPrice(shopCartSave);
  saveCartItems(JSON.stringify(shopCartSave));
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => cartItemClickListener(event, sku));
  listOl.appendChild(li);
  return li;
}

const productById = async (idProduct) => {
  const objProduct = await fetchItem(idProduct);
  const { id: sku, title: name, price: salePrice } = objProduct;
  const objParam = { sku, name, salePrice };
  listOl.appendChild(createCartItemElement(objParam));
  shopCartSave.push(objParam);
  sumPrice(shopCartSave);
  saveCartItems(JSON.stringify(shopCartSave));
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btn.addEventListener('click', () => {
    productById(sku);
  });
  section.appendChild(btn);

  return section;
}

const productByName = (paramItem) => {
  fetchProducts(paramItem)
  .then((promisse) => promisse.forEach(({ id, title, thumbnail }) => {
    const obj = { sku: id, name: title, image: thumbnail };
    document.querySelector('.items').appendChild(createProductItemElement(obj));
  }))
  .then(() => document.querySelector('.load').remove());
};

function getSavedWithListenner() {
  const arrayParse = JSON.parse(getSavedCartItems('cartItems'));
  if (arrayParse) {
    shopCartSave.push(...arrayParse);
    arrayParse.forEach((listItem) => {
      createCartItemElement(listItem);
    });
    sumPrice(shopCartSave);
  }
}

const btnClear = document.querySelector('.empty-cart');
btnClear.addEventListener('click', () => {
  document.querySelector('.total-price').innerHTML = 0; 
  listOl.innerHTML = '';
  saveCartItems('');
});

window.onload = () => {
  productByName('computador');
  getSavedWithListenner();
};
