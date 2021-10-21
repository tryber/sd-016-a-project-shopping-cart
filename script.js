function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
function returnLista() {
  return document.querySelectorAll('.cart__item'); 
}

function sumOfValues() {
  const lista = [];
  returnLista().forEach((x) => lista.push(x.innerText));
  console.log(lista);
  const preços = lista.map((x) => {
    const frase = x;
    const preço = parseFloat(frase.substring(frase.indexOf('$') + 1), 10);
    return preço;
  });
  if (preços.length === 0) {
    document.querySelector('.total-price').innerText = `Price = ${0}`;
  } else {
    const total = preços.reduce((x, y) => x + y);
    document.querySelector('.total-price').innerText = `Price = ${total}`;
  }
}
function load() {
  const loading = document.createElement('p');
  loading.style.display = 'block';
  loading.innerText = 'Loading . . .';
  loading.className = 'loading';
  document.querySelector('.cart').appendChild(loading);
}
function unload() {
  const x = document.querySelectorAll('.loading');
  x.forEach((y) => y.parentElement.removeChild(y));
}

function cartItemClickListener({ target }) {
  target.parentElement.removeChild(target);
  sumOfValues();
  saveCartItems();
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  sumOfValues();
  return li;
}

async function onClickAddCarrinho({ target }) {
  const id = target.parentElement.firstElementChild.innerText;
  load();
  const Objeto = await fetchItem(id);
  unload();
  const porNoCarrinho = createCartItemElement(Objeto);
  porNoCarrinho.addEventListener('click', cartItemClickListener);
  document.querySelector('.cart__items').appendChild(porNoCarrinho);
  sumOfValues();
  saveCartItems();
}

function createProductItemElement({ id, title, thumbnail }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  const butao = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  butao.addEventListener('click', onClickAddCarrinho);
  section.appendChild(butao);
  return section;
}
function removertudo() {
  const lista = returnLista();
  lista.forEach((x) => x.parentElement.removeChild(x));
  saveCartItems();
}
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
async function createItens() {
  const resultados = await fetchProducts();
  const list = document.querySelector('.items');
  const sections = resultados.results.map((p) => createProductItemElement(p));
  sections.forEach((y) => list.appendChild(y));
}

function loadCart() {
  if (localStorage.getItem('cartItems') !== null) {
    const produtos = JSON.parse(getSavedCartItems());
    console.log(produtos);
    produtos.forEach((x) => {
      const li = document.createElement('li');
      document.querySelector('.cart__items').appendChild(li);
      li.outerHTML = x;
    });
    sumOfValues();
  }
}
window.onload = () => {
  loadCart(); 
  const carrinho = returnLista();
  carrinho.forEach((x) => x.addEventListener('click', cartItemClickListener));
  createItens();
};
