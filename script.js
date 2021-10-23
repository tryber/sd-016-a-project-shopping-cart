const list = document.querySelector('.cart__items');

const localStorageList = []; // Criei um array vazio para dar push toda vez que salvar uma lista de produtos no localStorage.

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
  event.target.remove();  
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => {
    cartItemClickListener(event);
    localStorageList.forEach((elementObj, index) => {
      if (elementObj.sku === sku) {
        localStorageList.splice(index, 1);
      }
    });
    saveCartItems(JSON.stringify(localStorageList)); // Aqui o forEach na minha lista do localStorage foi feito junto com o splice para poder apagar algum elemento (objeto com infos do produto) quando o evento do click de APAGAR algum item do carrinho acontecer.
  });
  return li;
}

async function buildCarItem(sku) {
  const itemList = await fetchItem(sku);
  const { title: name, price: salePrice } = itemList;
  list.appendChild(createCartItemElement({ sku, name, salePrice }));
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => { 
    buildCarItem(sku);
    const productObj = { sku, name, image }; // Criando o objeto de produtos nessa função também para poder dar o push no localStorageList toda vez que algum botão de um item for clicado. 
    localStorageList.push(productObj);
    saveCartItems(JSON.stringify(localStorageList)); // Chamando a função setItem do localStorage aqui porque é nessa função que a lista de produtos foi criada ao clicar no botão (addEventListener), o JSON.stringify vai deixar eu visualizar o conteúdo como objeto na área salva do localStorage (application).
  });
  section.appendChild(button);
  return section;
}

// Código elaborado com a ajuda do Ricardo Carvalho, Turma 16A For(ever).
async function buildProductItem(product) {
  const getSection = document.querySelector('.items');
  const productsList = await fetchProducts(product);
  productsList.forEach((element) => {
    const productObj = { 
      sku: element.id, 
      name: element.title, 
      image: element.thumbnail,
    };
        const items = createProductItemElement(productObj);
    getSection.appendChild(items);
  });
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function getLocalStorageList() {
  const localList = JSON.parse(getSavedCartItems('cartItems'));
  localList.map((item) => buildCarItem(item.sku));
  }

window.onload = async () => {
  await buildProductItem('computador');
  getLocalStorageList();
 };
