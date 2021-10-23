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

function removerLista(event) {
  const salvarOl = document.querySelector('.cart__items'); 
  salvarOl.removeChild(event.target);
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const removerProduto = document.querySelector('.cart__item');
  removerProduto.addEventListener('click', removerLista);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
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
  console.log(searchData);
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
  console.log(itemAtual);
  salvarBotao.addEventListener('click',
   () => adicionarCarrinho(createCartItemElement(objetoCarrinho(itemAtual))));
  });
}

window.onload = searchProducts('computador');
