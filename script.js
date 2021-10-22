// const fetchSimulator = require("./mocks/fetchSimulator");
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

async function searchProducts(product) { // definimos que essa função é assincrona
  const arrayAllProducts = await fetchProducts(product); // e que espera o retorno de fetchProducts
  const localSection = document.querySelector('.items'); // resgatamos o lugar onde vamos criar os itens

  arrayAllProducts.results.forEach((item) => { // percorremos o array de produtos
    const objectProducts = { // criando um objeto, orientando as chaves existentes as que serão necessarias para a função createProductItemElement
      sku: item.id,
      name: item.title, 
      image: item.thumbail,
    };

    const createItens = createProductItemElement(objectProducts); // armazenamos o retorno de createProductItemElement
    localSection.appendChild(createItens); // na section no  html, criamos o retorno de createProductItemElement
  });
}

window.onload = () => {
  searchProducts('computador');
};
