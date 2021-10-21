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
  event.target.remove()
  //ajuda do miyazaki
}

function createCartItemElement({ sku, name, salePrice }) {
  const ol = document.querySelector('.cart__items'); 
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  ol.appendChild(li);
}

const getID = async (sku) => {
  const fetch = await fetchItem(sku);
  console.log(fetch);
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
  const createBtn = section
    .appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  createBtn.addEventListener('click', () => {
    getID(sku);
  });
  section.appendChild(createBtn);
  sectionPai.appendChild(section);
}

const loadProducts = () => {
  fetchProducts('computador').then((value) => {
    value.results.forEach((item) => {
      createProductItemElement(item);
    });
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = () => {
  loadProducts();
};
