const newList = document.querySelector('ol');

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
// Requisito feito com ajuda do colega Mateus Turola.
function sumPrice() {
  const prices = Array.from(document.querySelectorAll('.cart__item'));  
 
  const soma = prices.reduce((acc, crr) => (
    acc + parseFloat(crr.innerText.split('PRICE: $')[1])
  ), 0);
  const aleluia = document.querySelector('.total-price');
  aleluia.innerText = soma;
  return soma;
}

function cartItemClickListener(event) {
  event.target.remove();
  sumPrice();
  saveCartItems(newList);
}
// Requisito feito com ajuda da colega Fumagalli
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener); 
  // li.addEventListener('click', (event) => event.target.remove())
  
  return li;
}
// Requisito feito com ajuda da colega Fumagalli
function createProductItemElement(productItem) {
  const { sku, name, image } = productItem;
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', async () => {
    const fetchItemSaved = await fetchItem(sku);
    const liCartItem = createCartItemElement(fetchItemSaved);
    newList.appendChild(liCartItem);
    sumPrice();
    saveCartItems(newList);
  });
  
  section.appendChild(button);
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// Requisito feito a partir do vídeo postado pelo especialista Bernardo
async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
  document.querySelector('.loading').remove();
  return li;
}

function loading() {
  const savedItems = getSavedCartItems();
  newList.innerHTML = savedItems;
}

const btnClear = document.querySelector('.empty-cart');
btnClear.addEventListener('click', () => {
  document.querySelector('.total-price').innerHTML = 0;
    newList.innerHTML = '';
    getSavedCartItems(newList);
});

window.onload = () => { 
  searchProducts('computador');
  loading();
};