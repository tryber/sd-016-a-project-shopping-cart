// const { fetchProducts } = require("./helpers/fetchProducts");

// const { fetchItem } = require("./helpers/fetchItem");

// const { fetchItem } = require("./helpers/fetchItem");
// const { fetchProducts } = require("./helpers/fetchProducts");

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
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addToCart(id) {
  const result = await fetchItem(id); // Pegando os dados
  const theObjectToAdd = { // criando um objeto com os dados
    sku: result.id,
    name: result.title,
    salePrice: result.price,
  };
  console.log(theObjectToAdd);
  const whereToAppend = document.querySelector('.cart__items');
  whereToAppend.appendChild(createCartItemElement(theObjectToAdd));
}

function getAllBtnsAndAdd() {
  const allbtns = document.querySelectorAll('.item__add'); // pegando os botoes
  allbtns.forEach((btn) => { // adicionando a funcao de pegar o valor do ID dos items clicados
    btn.addEventListener('click', () => {
      const id = this.target.parentElement.firstChild.innerText;
      addToCart(id);
    });
  });
}

async function getCreateItems(item) {
  const dataResult = await fetchProducts(item);

  dataResult.forEach((result) => {
    const theResult = {
      sku: result.id,
      name: result.title,
      image: result.thumbnail,
    };
    const theProduct = createProductItemElement(theResult);
    document.querySelector('.items').appendChild(theProduct);
  });
  getAllBtnsAndAdd();
}

window.onload = () => { 
  getCreateItems('computador');
};
