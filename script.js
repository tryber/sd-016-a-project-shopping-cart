const onLoad = () => {
  const loadingSpan = document.createElement('p');
  loadingSpan.style.display = 'block';
  loadingSpan.innerText = 'carregando...';
  loadingSpan.className = 'loading';
  document.querySelector('.cart').appendChild(loadingSpan);
};

const loaded = () => {
  const loadingElement = document.querySelectorAll('.loading');
  loadingElement.forEach((x) => x.parentElement.removeChild(x));
};

// Obtem os elementos do carrinho e botao de esvaziar o carrinho
const getCartContainer = () => document.querySelector('.cart__items');
const getCleanButton = document.querySelector('.empty-cart');

// Cria o elemento img seus atributos 
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// Cria um elemento e seus atributos
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// Cria o elemento do produto com id, imagem, nome e preço
function createProductItemElement({ id: sku, title: name, thumbnail: image, price: productPrice }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', productPrice));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

// Mostra na tela os produtos carregados da API
const displayOnScreen = async () => {
  onLoad();
  const data = await fetchProducts('computador');
  loaded();
  data.results.forEach((element) => {
    const itemsSection = document.querySelector('.items');
    const { id, title, thumbnail, price } = element;
    const section = createProductItemElement({ id, title, thumbnail, price });
    itemsSection.appendChild(section);
  });
};

const createPriceElement = () => {
  const cart = document.querySelector('.cart');
  const totalPriceElement = document.createElement('span');
  totalPriceElement.className = 'total-price';
  totalPriceElement.innerHTML = 'R$: 0';
  cart.appendChild(totalPriceElement);
};

const totalPriceCalculus = () => {
  const cart = getCartContainer();
  const cartItemsPrice = cart.children;
  const totalPriceElement = document.querySelector('.total-price');
  if (cartItemsPrice.length > 0) {
    let total = 0;
    for (let i = 0; i < cartItemsPrice.length; i += 1) {
      const curr = cartItemsPrice[i];
      const productPrice = Number(curr.className);
      total += productPrice;
      totalPriceElement.innerHTML = `${total}`;
    }
  } else {
    totalPriceElement.innerHTML = '0';
  }
};

const cleanCart = () => {
  getCartContainer().innerHTML = '';
  localStorage.clear();
  totalPriceCalculus();
};

function cartItemClickListener(event) {
  const clickedItem = event.target.parentNode;
  clickedItem.removeChild(event.target);
  totalPriceCalculus();
  saveCartItems(clickedItem.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.className = `${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addToCart = async (itemId) => {
  onLoad();
  const data = await fetchItem(itemId);
  unLoad();
  const cartContainer = getCartContainer();
  const { id, title, price } = data;
  const listItem = createCartItemElement({ id, title, price });
  cartContainer.appendChild(listItem);
  totalPriceCalculus();
  saveCartItems(cartContainer.innerHTML);
};

const addButton = () => {
  const storeItem = document.querySelectorAll('.item__add');
  storeItem.forEach((element) => {
    element.addEventListener('click', (evt) => {
      const itemNode = evt.target.parentNode.firstChild.innerHTML;
      addToCart(itemNode);
    });
  });
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

window.onload = () => { 
  displayOnScreen()
    .then(() => { addButton(); })
      .then(() => {
        const locateCart = getCartContainer();
        const getSavedItems = getSavedCartItems();
        locateCart.innerHTML = getSavedItems;
        const cartItems = locateCart.children;
        for (let i = 0; i < cartItems.length; i += 1) {
          cartItems[i].addEventListener('click', cartItemClickListener);
        }
      })
      .then(() => {
        createPriceElement();
        totalPriceCalculus();
        getCleanButton.addEventListener('click', cleanCart);
      });
};
