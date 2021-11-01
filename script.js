// Com colaboração de Priscila Silva

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

// Elaborado com ajuda do Otávio Cantarelli

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

const productByName = async (paramItem) => {
  const promisse = await fetchProducts(paramItem);
  promisse.forEach(({ id, title, thumbnail }) => {
    const obj = { sku: id, name: title, image: thumbnail };
    document.querySelector('.items').appendChild(createProductItemElement(obj));
  });
  document.querySelector('.loading').remove();
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
  productByName('computador');
  getSavedWithListenner();
};