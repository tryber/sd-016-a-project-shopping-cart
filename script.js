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
  // code
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemToCart(itemId) {
  const searchedItem = await fetchItem(itemId);
  const sectionCartItens = document.querySelector('.cart__items');
  console.log(searchedItem);
  const productItemObject = {
    sku: searchedItem.id,
    name: searchedItem.title,
    salePrice: searchedItem.price,
  };
  const liCartItem = createCartItemElement(productItemObject);
  sectionCartItens.appendChild(liCartItem);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  // section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  const addToCartBtn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addToCartBtn.addEventListener('click', () => {
    addItemToCart(sku);
  });
  section.appendChild(addToCartBtn);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// results.id = sku
// title = nome do produto
// thumbnail = imagem do produto
// req-01 com ajuda do Bê
async function searchProducts(product) {
  const searchedData = await fetchProducts(product);
  const sectionItens = document.querySelector('.items');
  searchedData.results.forEach((item) => {
    const productItemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItemElement = createProductItemElement(productItemObject);
    // const addItemToCartBtn = document.querySelector('button.item__add');
    // addItemToCartBtn.addEventListener('click', addItemToCart);
    sectionItens.appendChild(productItemElement);
  });
}

window.onload = () => { 
    searchProducts('computador');
};
