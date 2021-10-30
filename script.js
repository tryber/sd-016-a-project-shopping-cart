// requisito executado com o auxilio do vídeo e mentoria de Bernando, mentoria de Humberto Castro e Caique
// const cartItemsList = document.querySelector('.cart_items');

// const countItemsBuy = () => {
//   if (cartItemsList.innerHTML === '') return 0;
//   const getResultLocalStorage = getSavedCartItems();
//   const result = getResultLocalStorage.split('PRICE: $').reduce((acc, value) => {
//     acc.push(value.substring(0, value.indexOf('<')));
//     return acc;
//   }, []);
//   result.shift();
//   const total = result.reduce((acc, curr) => Number(acc) + Number(curr));
//   document.querySelector('.total-price').innerHTML = total;
// };

// function createProductImageElement(imageSource) {
//   const img = document.createElement('img');
//   img.className = 'item__image';
//   img.src = imageSource;
//   return img;
// }

// function createCustomElement(element, className, innerText) {
//   const e = document.createElement(element);
//   e.className = className;
//   e.innerText = innerText;
//   return e;
// }

// function cartItemClickListener(event) {
//   event.target.remove();
//   saveCartItems(cartItemsList.innerHTML);
// countItemsBuy();
// }

// function createCartItemElement({ sku, name, salePrice }) {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//   li.addEventListener('click', cartItemClickListener);
// countItemsBuy();
//   return li;
// }

// const createCartofTheBuy = async (id) => {
//   const objectBuy = await fetchItem(id);
//   const objectList = { sku: objectBuy.id, name: objectBuy.title, salePrice: objectBuy.price };
//   cartItemsList.appendChild(createCartItemElement(objectList));
//   saveCartItems(cartItemsList.innerHTML);
// // countItemsBuy();
// };

// // const addCartBuy = async (id) => {
// //   const search = await fetchItem(id);
// //   const ol = document.querySelector('cart_items');
// //   const itemElement = createCartItemElement(object);
// //   ol.appendChild(itemElement);
// // };

// function createButton() {
//   const buttonRemove = document.querySelector('.empty-cart');
//   buttonRemove.addEventListener('click', () => {
//     cartItemsList.innerHTML = '';
//   });
// // countItemsBuy();
// }

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addButton.addEventListener('click', () => 
  createCartofTheBuy(sku));
  section.appendChild(addButton);
    // countItemsBuy();
    return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
   const itemObj = { sku: item.id, name: item.title, image: item.thumbnail };
   const productItem = createProductItemElement(itemObj);
   sectionItems.appendChild(productItem);
  });
}

// const restorePage = () => {
//   const getResult = getSavedCartItems();
//   cartItemsList.innerHTML = getResult;
//   //  countItemList();
// };

// const restoreEvent = () => {
//   cartItemsList.addEventListener('click', cartItemClickListener);
//   //  countItemList();
// };

window.onload = () => {
  searchProducts('computador');
  // createButton();
  // // countItemsBuy();
  // restorePage();
  // restoreEvent();
};
