const localOl = document.querySelector('ol'); // definimos o lugar da ol
const localButtonEmptyCart = document.querySelector('.empty-cart');
const localTotalPrice = document.querySelector('.total-price');

async function totalPrice() {
  let sumPrice = 0;

  const fullListItems = await getSavedCartItems(); // retorna itens como string
  const corte = fullListItems.split('$'); // separa em novos itens de um array a partir do 'R$'
  corte.shift(); // remove o item zero, que contem a string anterior anterior ao primeiro corte

  corte.forEach((item) => { // percorremos array, cada item se inicia com o preço 
    sumPrice += parseFloat(item.substring(0, item.indexOf('<')));
  });

  /**
    indexOf defini a posição do final da string para retornar somente numeros | sugestão do Brunão | https://www.w3schools.com/jsref/jsref_indexof.asp
    substring é um método de retornar somente partes de uma string | sugestão do Brunão | https://www.w3schools.com/jsref/jsref_substring.asp | https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/substring
    parseFloat converte os numeros retirados da string em numeros, podendo ser decimais | https://www.w3schools.com/jsref/jsref_parsefloat.asp
  */
  localTotalPrice.innerText = sumPrice;
}

function cartItemClickListener(event) { 
  event.target.remove(); // retira do carrinho o item clicado
  saveCartItems(localOl.innerHTML);
  totalPrice();
}

function createCartItemElement({ sku, name, salePrice }) { // adiciona itens no carrinho
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
async function searchItem(sku) { // procura um item especifico
  const objectIdItem = await fetchItem(sku);
  const { title: name, price: salePrice } = objectIdItem; // desestruturamos os itens necessarios
  localOl.appendChild(createCartItemElement({ sku, name, salePrice })); // criamos o item no carrinho na ol

  saveCartItems(localOl.innerHTML);
  totalPrice();
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
function createProductItemElement({ id: sku, title: name, thumbnail: image, price: salePrice }) { // cria no html todos os produtos
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));

  // section.appendChild(createCartItemElement('span','price__item', salePrice));
  section.appendChild(createCustomElement('span', 'price_item', `R$${salePrice} à vista`));

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
const localLi = document.getElementsByTagName('li');
function reloadCart() {
  localOl.innerHTML = getSavedCartItems();
  Object.values(localLi).forEach((item) => item.addEventListener('click', cartItemClickListener));
}
function emptyCart() {
  localOl.innerHTML = '';
  saveCartItems(localOl.innerHTML);
  totalPrice();
}

localButtonEmptyCart.addEventListener('click', emptyCart);

window.onload = () => {
  searchProducts('computador');
  reloadCart();
  totalPrice();
};
