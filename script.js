const getListCart = document.querySelector('.cart__items');

// Funções básicas já implementadas para criar elementos:

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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(getListCart.innerHTML);
}

// REQUISITO 2 - feito com a ajuda expecional de meus queridos colegas:
// Renan Souza, Lucas Alves, Matheus Benini, Italo Moraes;
// Rafael Feliciano, Fabrício Martins e Júlia Barcelos <3

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Função desenvolvida Req.2
async function buttonRequisition(sku) {
  const findTheProduct = await fetchItem(sku);
  const { title: name, price: salePrice } = findTheProduct;
  const cartList = createCartItemElement({ sku, name, salePrice });
  getListCart.appendChild(cartList);
  saveCartItems(getListCart.innerHTML);
}

// REQUISITO 1
function createProductItemElement({ sku, name, image }) {
  const getSectionItem = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const newButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  newButton.addEventListener('click', () => {
    buttonRequisition(sku);
  });
  section.appendChild(newButton);
  getSectionItem.appendChild(section);
  return section;
}

// Função desenvolvida Req.1 após assistir vídeo do Bê
async function searchProduct(product) {
  const searchResult = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchResult.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

// REQUISITO 4 - implementado com a ajuda do colega Josué

const cartRestoration = () => {
  const localStorage = getSavedCartItems();
  getListCart.innerHTML = localStorage;
  
  Array.from(getListCart.children).forEach((child) => {
    child.addEventListener('click', cartItemClickListener);
  });
};

window.onload = () => { 
  searchProduct('computador');
  cartRestoration();
};
