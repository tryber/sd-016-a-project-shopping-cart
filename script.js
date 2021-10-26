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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(btn);
  const itens = document.querySelector('.items');
  itens.appendChild(section);

  return section;
}

// Função para criar o texto de "Loading"
const createLoadingText = (element, className, innerText) => 
  document.body.appendChild(createCustomElement(element, className, innerText));

// Função para remover o texto de "Loading"
const removeLoadingText = () => {
  const loading = document.querySelector('.loading');
  loading.remove();
};
// Requisito 1
const productsList = () => fetchProducts('computador')
  .then((response) => {
    response.results.forEach((products) => {
      createProductItemElement(products);
    });
  })
  .then(() => removeLoadingText());

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

window.onload = () => { 
  createLoadingText('h1', 'loading', 'carregando...');
  productsList();
};
