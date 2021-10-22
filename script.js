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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
// Feito com o auxilio do vídeo gravado pelo Instrutor Bernardo Salgueiro.
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
}

async function addItemsToCart(idProduct) {
  const searchData = await fetchItem(idProduct);
  const selectItem = document.querySelector('.cart__items');
  searchData.results.forEach((selectedItem) => {
    const selectedItemObj = {
      sku: selectedItem.id,
      name: selectedItem.title,
      salePrice: selectedItem.price,
    };
    const addObjectProduct = createCartItemElement(selectedItemObj);
    selectItem.appendChild(addObjectProduct);
  });
}

window.onload = () => { 
 searchProducts('computador');
 addItemsToCart('MLB1615760527');
 };
