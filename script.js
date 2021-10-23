const sectionItens = document.querySelector('.items');

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
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const adicionaAoCarrinho = async (itemId) => {
  const resultadoId = await fetchItem(itemId);
  const listaItens = document.querySelector('.cart__items');
  const { id: sku, title: name, price: salePrice } = resultadoId;
  const listaCarrinho = createCartItemElement({ sku, name, salePrice });
  listaItens.appendChild(listaCarrinho);
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonAdcCarrinho = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonAdcCarrinho.addEventListener('click', () => {
    adicionaAoCarrinho(sku);
  });
  section.appendChild(buttonAdcCarrinho);
  sectionItens.appendChild(section);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const listaProdutos = async (produto) => {
  const resultadoProduto = await fetchProducts(produto);
  resultadoProduto.results.forEach((element) => {
    const itensObjeto = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
  };
    const itemProdutos = createProductItemElement(itensObjeto);
    sectionItens.appendChild(itemProdutos);
  });
};

window.onload = () => {
  listaProdutos('computador');
};
