const capturarListCart = document.querySelector('.cart__items');
const limparCarrinho = document.querySelector('.empty-cart');

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
  // coloque seu código aqui
  event.target.remove();
  saveCartItems(capturarListCart.innerHTML);
  // credito ao amigo Miyazaki
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  capturarListCart.appendChild(li);
  saveCartItems(capturarListCart.innerHTML);
}

const idDoProdutoclicadoParaCarrinho = async (sku) => {
  const fetch = await fetchItem(sku);
  const { title: name, price: salePrice } = fetch;
  createCartItemElement({ sku, name, salePrice });
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  const sectionPai = document.querySelector('.items');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const criaBotaoEvento = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  criaBotaoEvento.addEventListener('click', () => {
    idDoProdutoclicadoParaCarrinho(sku);
  });
  section.appendChild(criaBotaoEvento);

  sectionPai.appendChild(section);
}

const milagre = () => {
  fetchProducts('computador').then((value) => {
  value.results.forEach((item) => {
    createProductItemElement(item);
  });
});
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const restalrarCarrinho = () => {
  const localStorage = getSavedCartItems();
  capturarListCart.innerHTML = localStorage;
};

const restalrarListaCarrinho = () => {
  // https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from

  Array.from(capturarListCart.children).forEach((filho) => {
    filho.addEventListener('click', cartItemClickListener);
  });
};

window.onload = () => { 
  milagre();
  if (capturarListCart.children.length === 0) restalrarCarrinho();
  restalrarListaCarrinho();
};

function limparListaCarrinho() {
  // Leandro Goerck
  capturarListCart.innerHTML = '';
  saveCartItems(capturarListCart.innerHTML);
}

limparCarrinho.addEventListener('click', limparListaCarrinho);
