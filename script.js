let totalValue = 0;
const items = document.querySelector('.items');
const emptyCart = document.querySelector('.empty-cart');
const cartItems = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

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
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => {
    cartItemClickListener(event);
    const productNumber = +salePrice;
    totalValue -= productNumber;
    if (totalValue < 0) totalValue = 0;
    totalPrice.innerHTML = totalValue;
  });
  return li;
}

// Agradecimento especial a Fumagalli(T16) que me ajudou a chegar a uma melhor conclusão.
const addLoad = () => {
  const loading = document.createElement('p');
  loading.classList = 'loading';
  items.appendChild(loading).innerHTML = 'carregando...';
};

// Agradecimento especial a Fumagalli(T16) que me ajudou a chegar a uma melhor conclusão.
const removeLoad = () => {
  const loading = document.querySelector('.loading');
  loading.remove();
};

// Agradecimento especial ao Bernardo Salgueiro(Instrutor - T16) por ter feito um video ajudando a desenrolar o requisito 1.
const searchProduct = async (product) => {
  addLoad();
  const search = await fetchProducts(product);

  search.results.forEach((result) => {
    const item = createProductItemElement({
      sku: result.id, name: result.title, image: result.thumbnail,
    });

    items.appendChild(item);
  });
  removeLoad();
};

const getProduct = async (select) => {
  if (select.target.classList.contains('item__add')) {
    const product = await fetchItem(select.target.parentElement.firstChild.textContent);
    const { id: sku, title: name, price: salePrice } = product;
    const productNumber = +salePrice;

    totalValue += productNumber;
    totalPrice.innerHTML = totalValue;
    cartItems.appendChild(createCartItemElement({ sku, name, salePrice }));
    saveCartItems(cartItems.innerHTML);
  }
};

const delectAll = async () => {
  const li = document.querySelectorAll('.cart__item');
  totalPrice.innerHTML = 0;
  li.forEach((item) => item.remove());
  saveCartItems(cartItems.innerHTML);
};

window.onload = () => {
  searchProduct('computador');
  emptyCart.addEventListener('click', delectAll);
  document.addEventListener('click', getProduct);
  if (localStorage.getItem('cartItems')) {
    // Agradecimento especial ao Carlos(T16) e Fumagalli(T16) que me ajudaram a chegar a uma melhor conclusão.
    cartItems.innerHTML = getSavedCartItems();
    cartItems.childNodes.forEach((item) => item.addEventListener('click', cartItemClickListener));
  }
};
