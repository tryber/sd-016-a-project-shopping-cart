let totalpreço = 0;
const preçosalvo = document.querySelector('.total-price');
const ajust = '.cart__items';

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
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function removeLista(target) {
  const salvarOl = document.querySelector(ajust);
  salvarOl.removeChild(target);
  const preçoAtual = target.getAttribute('data-price');
  totalpreço -= Number(preçoAtual);
  preçosalvo.innerHTML = totalpreço;
}

function removerCarrinho() {
  const salvarCarro = document.querySelector(ajust);
  salvarCarro.innerHTML = '';
  totalpreço = 0;
  preçosalvo.innerHTML = totalpreço;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  // const removeProdutos = document.querySelectorAll('.cart__item');
  // removeProdutos.forEach((item) => {
  //   item.addEventListener('click', removerLista);
  // });
  removeLista(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.setAttribute('data-price', `${salePrice}`);
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  const removeTudo = document.querySelector('.empty-cart');
  removeTudo.addEventListener('click', removerCarrinho);
  totalpreço += salePrice;
  preçosalvo.innerHTML = totalpreço;
  return li;
}
function adicionarCarrinho(li) {
  const selectOl = document.querySelector('.cart__items');
  selectOl.appendChild(li);
}

const objetoCarrinho = (itemAtual) => ({
  sku: itemAtual.id,
  name: itemAtual.title,
  salePrice: itemAtual.price,
});

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItens = document.querySelector('.items');
  searchData.results.forEach(async (item, index) => {
    const cadaItem = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(cadaItem);
    sectionItens.appendChild(productItem);
    const salvarBotao = document.querySelectorAll('.item__add')[index];
    const itemAtual = await fetchItem(item.id);
    salvarBotao.addEventListener('click', () =>
      adicionarCarrinho(createCartItemElement(objetoCarrinho(itemAtual))));
  });
}

window.onload = searchProducts('computador');
