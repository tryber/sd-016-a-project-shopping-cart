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

async function adicionaCar(object) {
  const valores = object.sku;
  const itemSection = document.querySelector('.cart__items'); 
  const data = await fetchItem(valores);
  const itemObject = {
    sku: data.id,
    name: data.title,
    salePrice: data.price,
  };
    const section = createCartItemElement(itemObject);
    itemSection.appendChild(section);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const createButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  createButton.addEventListener('click', () => {
    adicionaCar({ sku, name, image });
  });
  section.appendChild(createButton);

  return section;
}

async function carregaProdutos(produto) {
  const data = await fetchProducts(produto);
  const itemSection = document.querySelector('.items'); 
  data.results.forEach((item) => {
   const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const section = createProductItemElement(itemObject);
    itemSection.appendChild(section);
  });
}

window.onload = () => { 
  carregaProdutos('computador');
};
