const listaItens = document.querySelector('.cart__items');

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
  saveCartItems(listaItens.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  listaItens.appendChild(li);
  saveCartItems(listaItens.innerHTML);
  // return li;
}

const adicionaAoCarrinho = async (itemId) => {
  const resultadoId = await fetchItem(itemId);
  const { id: sku, title: name, price: salePrice } = resultadoId;
  createCartItemElement({ sku, name, salePrice });
};

function createProductItemElement({ sku, name, image }) {
  const sectionItens = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonAdcCarrinho = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonAdcCarrinho.addEventListener('click', () => {
    adicionaAoCarrinho(sku);
  });
  section.appendChild(buttonAdcCarrinho);
  sectionItens.appendChild(section);
  // return section;
}

const listaProdutos = async (produto) => {
  const resultadoProduto = await fetchProducts(produto);
  resultadoProduto.results.forEach((element) => {
    const itensObjeto = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
  };
    createProductItemElement(itensObjeto);
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const restauraCarrinho = () => {
  listaItens.innerHTML = getSavedCartItems();
};

const restauraEventListner = () => {
  listaItens.addEventListener('click', cartItemClickListener);
};

window.onload = () => {
  listaProdutos('computador');
  restauraCarrinho();
  restauraEventListner();
};
