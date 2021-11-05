const cartItens = document.getElementsByClassName('cart_item');

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
  const btnAddCart = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btnAddCart.addEventListener('click', () => addItemToCart(sku));
  section.appendChild(btnAddCart);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}
// Requisito 2
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return (li);
}
// Adicione o elemento retornado da função createCartItemElement(product) como filho do elemento <ol class="cart__items">.

async function addItemShoppingCart(sku) {
  const { title: name, price: salePrice } = await fetchItem(sku);
  cartItens.appendChild(createCartItemElement({ sku, name, salePrice }));
}

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

window.onload = () => {
  searchProducts('computador');
 };
