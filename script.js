// cria os cards dos produtos
function createProductImageElement(imageSource) {
  const conteiner = document.createElement('div');
  conteiner.className = 'conteiner_img';

  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  conteiner.appendChild(img);
  // return img;
  return conteiner;
}

function cartItemClickListener(event) {
  const li = event.target;
  li.innerHTML = '';
  li.remove();
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addProductToCart(productID) {
  const itemData = await fetchItem(productID);
  const sectionItem = document.querySelector('.cart__items');
  const { id: sku, title: name, price: salePrice } = itemData;
  const chartItem = createCartItemElement({ sku, name, salePrice });
  sectionItem.appendChild(chartItem);
}

// function createCartItemElement({ url, name, salePrice }) {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${url} | NAME: ${name} | PRICE: ${salePrice}`;
//   li.addEventListener('click', cartItemClickListener);
//   return li;
// }

// async function addProductToCart(productID) {
//   const itemData = await fetchItem(productID);
//   const sectionItem = document.querySelector('.cart__items');
//   const { thumbnail: url, title: name, price: salePrice } = itemData;
//   const chartItem = createCartItemElement({ url, name, salePrice });
//   sectionItem.appendChild(chartItem);
// }

function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'priceProduct', `R$ ${salePrice}`));
  const buttonItem = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonItem.addEventListener('click', () => addProductToCart(sku));
  section.appendChild(buttonItem);
  return section;
}

async function serchProducts(product) { // essa e uma funcao assincrona
  const searchData = await fetchProducts(product); // chamada da funcao fetchproduts.js
  const sectionItems = document.querySelector('.items'); // Target HTMl
  searchData.results.forEach((item) => { // results é palcançar os dados no array
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
      salePrice: item.price,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

// function getSkuFromProductItem(item) {
//   // return item.querySelector('span.item__sku').innerText;
// }
  
window.onload = () => { 
  serchProducts('computador');
};
