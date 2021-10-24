// const fetchSimulator = require("./mocks/fetchSimulator");
// const { fetchProducts } = require("./helpers/fetchProducts");

function cartItemClickListener(event) { // esvazia o carrinho
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) { // adiciona itens no carrinho
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function searchItem(sku) { // procura um item especifico
  const localOl = document.querySelector('ol'); // definimos o lugar da ol

  const objectIdItem = await fetchItem(sku);
  const { title: name, price: salePrice } = objectIdItem; // desestruturamos os itens necessarios
  localOl.appendChild(createCartItemElement({ sku, name, salePrice })); // criamos o item no carrinho na ol
}

function createProductImageElement(imageSource) { // gera a imagem da vitrine
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) { // cria o elemento para vitrine, com classe e texto
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) { // cria no html todos os produtos
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const botao = (createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  botao.addEventListener('click', () => { // adiciona escutador que busca o item e joga pro carrinho
    searchItem(sku);
  });
 
  section.appendChild(botao);
  
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// função refatorada com ajuda do Josué
async function searchProducts(product) { // função que filtra todos os produtos
  const arrayAllProducts = await fetchProducts(product);
  const localSection = document.querySelector('.items'); // resgatamos o lugar onde vamos criar os itens

  arrayAllProducts.results.forEach((item) => { // percorremos o array de produtos, e criamos os itens
    const createItens = createProductItemElement(item);
    localSection.appendChild(createItens); // na section no  html, criamos o retorno de createProductItemElement
  });
}

window.onload = () => {
  searchProducts('computador');
};
