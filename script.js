// Código elaborado com a colaboração de Laura Fumagalli e Priscila Silva
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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
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

function createLoading() {
  const getCart = document.querySelector('.cart');
  const loadingText = document.createElement('p');
  loadingText.className = 'loading';
  loadingText.innerText = 'carregando...';
  
  getCart.appendChild(loadingText);
}

function removeLoading() {
  const getLoading = document.querySelector('.loading');
  getLoading.remove();
}

function countTotalPrice() {
  const cartItems = document.querySelector('.cart__items').childNodes;
  const getTotal = document.querySelector('.total-price');

  if (cartItems.length <= 0) {
    getTotal.innerText = 0;
  }

  const arrItens = [];
  cartItems.forEach((item) => {
    arrItens.push(item.innerText.split(' '));
  });

  const arrPrices = arrItens.map((item) => (item[item.length - 1]).substring(1)); // Colocando cada item de preco dentro de um array
  const arrNumbers = arrPrices.map((number) => +(number)); // Transformando os itens de arrPrices (que estao como strings) em números
  if (arrNumbers.length !== 0) {
    const count = arrNumbers.reduce((acc, number) => acc + number); // Somando os números do array para retornar o total
    getTotal.innerText = count;
  } 
}

function clearCart() {
  const emptyCart = document.querySelector('.empty-cart');
  emptyCart.addEventListener('click', () => {
    const cartItems = document.querySelector('.cart__items');
    const totalPrice = document.querySelector('.total-price');
    cartItems.innerHTML = '';
    totalPrice.innerHTML = 0;
  });
}

function cartItemClickListener(event) {
  event.target.remove();
  countTotalPrice();
}

function createCartItemElement({ id: sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function loadProducts() {
  createLoading();
  await fetchProducts('computador')
    .then((products) => {
      const items = document.querySelector('.items');
      products.forEach((product) => {
        const item = createProductItemElement(product);
        items.appendChild(item);
      });
    });
  removeLoading();
}

async function addProductOnCart() {
  const product = await fetchProducts('computador');
  const ol = document.querySelector('ol');
  const productsLS = [];
  saveCartItems(productsLS);

  document.querySelectorAll('.item__add').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const productObj = {
        id: event.target.parentElement.firstChild.innerText,
        name: event.target.previousSibling.previousSibling.innerText,
      };
      productObj.salePrice = product.find(({ id }) => id === productObj.id).price;
      ol.appendChild(createCartItemElement(productObj));
      productsLS.push(productObj);
      saveCartItems(productsLS);
      countTotalPrice();
    });
  });
}

function loadLS() {
  if (JSON.parse(getSavedCartItems())) {
    const ol = document.querySelector('ol');
  
    JSON.parse(getSavedCartItems()).forEach((item) => {
      ol.appendChild(createCartItemElement(item)); 
    }); 
  }
}

window.onload = () => {
  loadProducts();
  addProductOnCart();
  JSON.parse(getSavedCartItems());
  loadLS();
  clearCart();
};
