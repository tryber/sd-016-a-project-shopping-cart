// requisito executado com o auxilio do vídeo de Bernando, mentoria de Humberto Castro e Caique
const requestList = document.querySelector('.cart_items');

const countItems = () => {
  if (requestList.innerHTML === '') return 0;
  const result = getSaveCartItems().split('PRICE :$').reduce((acc, value) => {
    acc.push(value.substring(0, value.indexOf('<')));
    return acc;
  }, []);
  return result;
};

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
  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
    addButton.addEventListener('click', () => {
      requestList(sku);
  });
  section.appendChild(addButton);

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(requestList.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
   const itemObj = { sku: item.id, name: item.title, image: item.thumbnail };
   const productItem = createProductItemElement(itemObj);
   sectionItems.appendChild(productItem);
  });
}

window.onload = () => {
  searchProducts('computador');
 
 };
