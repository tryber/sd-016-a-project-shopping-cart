// Para criar essas variáveis recebi ajuda do Matheus Guedes em um 1:1
let total = 0;
const totalPrice = document.querySelector('.total-price');
const limpar = document.querySelector('.empty-cart');
const listaOl = document.querySelector('ol');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
function cartItemClickListener(event) {
  event.target.remove();
  event.target.classList.remove('cart__item');
  soma(Number(-event.target.classList));
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.classList.add(salePrice);
  return li;
}
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btn.addEventListener('click', async () => {
    const result = await fetchItem(sku);
    const lista = await createCartItemElement(result);
    listaOl.appendChild(lista);
    console.log(result.price);
    soma(result.price);
    getSavedCartItems();
  });

  section.appendChild(btn);
  return section;
}
// Para está função recebi ajuda do Matheus Guedes em um 1:1
function soma(price) {
  total += price;
  totalPrice.innerText = total;
  console.log(totalPrice);
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
// Para está função recebi ajuda do Matheus Guedes em um 1:1
function limparCarrinho() {
  listaOl.innerHTML = '';
  total = 0;
  totalPrice.innerText = '0.00';
}

limpar.addEventListener('click', limparCarrinho);

// Para carregar a página
// async await -> Será uma função assícrona e vai esperar por algo
async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    // Desestruturando: extrai dados de um array ou objetos em var distintas->
    // MDN -> https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    // const { id: sku, title: name, thumbnail: image } = item;
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
  document.querySelector('.loading').remove();
}

window.onload = () => {
  searchProducts('computador');
  // listaOl.innerHTML = getSavedCartItems;
};
