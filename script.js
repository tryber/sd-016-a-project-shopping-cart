const capturarListCart = document.querySelector('.cart__items');
const limparCarrinho = document.querySelector('.empty-cart');

const telaDeCarregamento = () => {
  const criandoTela = document.createElement('h1');
  criandoTela.className = 'loading';
  criandoTela.innerHTML = 'carregando...';
  document.body.append(criandoTela);
};

const removerTelaCarregamento = () => {
  const capturandoTelaL = document.querySelector('.loading');
  capturandoTelaL.remove();
};

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

const contador = () => {
  const capturarTotalPrice = document.querySelector('.total-price');
  const caputarLocaStorage = getSavedCartItems();
  if (capturarListCart.children.length) {
    const arrayQUeVemDeLocalStorage = caputarLocaStorage.split('PRICE: $');
    arrayQUeVemDeLocalStorage.shift();
    const arrayTratado = arrayQUeVemDeLocalStorage.reduce((acc, curr) => {
      acc.push(Number(curr.substring(0, curr.indexOf('<'))));
      return acc;
    }, []);
    const resultado = arrayTratado.reduce((acc, curr) => acc + curr);
    capturarTotalPrice.innerText = resultado;
    return 1;// esta aqui para parar a funçao aqui.
  }
  capturarTotalPrice.innerText = 0;
};

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  saveCartItems(capturarListCart.innerHTML);
  // credito ao amigo Miyazaki
  contador();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  capturarListCart.appendChild(li);
  saveCartItems(capturarListCart.innerHTML);
  contador();
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
// funçao que pega os produtod da API e e joga eles para a tela usando o createProductItemElement.
const milagre = () => {
  telaDeCarregamento();
  fetchProducts('computador').then((value) => {
  value.results.forEach((item) => {
    createProductItemElement(item);
  });
  removerTelaCarregamento();
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
  contador();
};

function limparListaCarrinho() {
  //  ajuda do amigo Leandro Goerck
  capturarListCart.innerHTML = '';
  saveCartItems(capturarListCart.innerHTML);
  contador();
}

limparCarrinho.addEventListener('click', limparListaCarrinho);

// Com ajuda dos amigos Lucas Fernandes - Brunao - Danilo Meneguela - Leonardo Ferreira - Julia Barcelos - Renan Souza - Eduardo Miyazaki - Leandro Goerck - Guilherme Duarte, juntos em varios dias do projeto dando ideias unidos conseguimos chegar nos 100%