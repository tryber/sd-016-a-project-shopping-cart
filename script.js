/* o requisito 4 foi feito com a ajuda dos colegas de turma. Algumas coisas não ficaram tão claras então
dei checkout . e reiniciei algumas vezes. Por fim entrei em um monitoria que me ajudou a entender o requisito
*/
const cart = document.querySelector('.cart__items');

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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cart.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function selectAdiciona(event) {
  const id = event.target.parentNode.firstChild.innerHTML;
  const produtos = await fetchItem(id);

  const { id: sku, title: name, price: salePrice } = produtos;

  const objItem = {
    sku,
    name,
    salePrice,
  };

  const createCartItem = createCartItemElement(objItem);
  cart.appendChild(createCartItem);
  saveCartItems(cart.innerHTML);
}

async function productsSearch(product) {
  const products = await fetchProducts(product);
  const queryItens = document.querySelector('.items');

  products.results.forEach((produto) => {
    const { id: sku, title: name, thumbnail: image } = produto;
    const objProduct = {
      sku,
      name,
      image,
    };
    const productItem = createProductItemElement(objProduct);
    productItem.addEventListener('click', selectAdiciona);
    queryItens.appendChild(productItem);
  });
}

window.onload = () => {
  productsSearch('computador');
  if (localStorage.getItem('cartItems')) {
    cart.innerHTML = getSavedCartItems();
    cart.childNodes.forEach((item) => item.addEventListener('click', cartItemClickListener));
  }
};
