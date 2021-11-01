// requisito executado com o auxilio do vídeo e mentoria de Bernando, mentoria de Humberto Castro, repositório de Brunão(requisito 7)

const createLoading = () => {
  const loadingElement = document.createElement('h1');
  loadingElement.classList.add('loading');
  loadingElement.innerHTML = 'carregando';
  document.body.append(loadingElement);
};

const removeLoading = () => {
  const loadingElement = document.querySelector('.loading');
  loadingElement.remove();
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

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addCartItem(id) {
  const searchproduct = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = searchproduct;
  const itemBuy = createCartItemElement({ sku, name, salePrice });
  const setionCart = document.querySelector('.cart__items');
  setionCart.appendChild(itemBuy);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addButton.addEventListener('click', () => {
    addCartItem(sku);
  });
   section.appendChild(addButton);
   return section;
}
const fetchProductsReturn = () => {
  createLoading();
  fetchProducts('computador').then((value) => {
    value.results.forEach((product) => {
      createProductItemElement(product);
    });
  removeLoading();
  });
};

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
   const itemCase = { sku: item.id, name: item.title, image: item.thumbnail };
   const productCase = createProductItemElement(itemCase);
   sectionItems.appendChild(productCase);
  });
 }

function clearCart() {
  const clearList = document.querySelector('.empty-cart');
  const sectionCart = document.querySelector('.cart__items');
  clearList.addEventListener('click', () => {
    sectionCart.innerHTML = '';
    localStorage.removeItem('allItems');
  });
}

window.onload = async () => {
  searchProducts('computador');
  fetchProductsReturn();
  clearCart();
};
