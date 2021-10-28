function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const createObj = (item) => {
  const a = {
    id: item.id,
    title: item.title,
    thumbnail: item.thumbnail,
    price: item.price,
  };
  return a;
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  const cart = document.querySelector('.cart__items');
  cart.appendChild(li);
  return li;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btnItem = createCustomElement('button', 'item__add', 'Adicionar ao carrinho');
  btnItem.addEventListener('click', async () => {
    const a = await fetchItem(sku);
    const b = createObj(a);
    createCartItemElement(b);
  });
  section.appendChild(btnItem);

  const item = document.querySelector('.items');
  item.appendChild(section);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = () => {
  fetchProducts('computador')
    .then((data) => {
      data.forEach((e) => {
        const product = createObj(e);
      createProductItemElement(product);
      });
    });
};
