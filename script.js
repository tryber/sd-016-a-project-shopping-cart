// Código elaborado com a colaboração de Laura Fumagalli e Priscila Silva
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
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
}

function createCartItemElement({ id: sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function loadProducts() {
  await fetchProducts('computador')
    .then((products) => {
      const items = document.querySelector('.items');
      products.forEach((product) => {
        const item = createProductItemElement(product);
        items.appendChild(item);
      });
    });
}

async function addProductOnCart() {
  const product = await fetchProducts('computador');
  const ol = document.querySelector('ol');

  document.querySelectorAll('.item__add').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const productObj = {
        id: event.target.parentElement.firstChild.innerText,
        name: event.target.previousSibling.previousSibling.innerText,
      };
      productObj.salePrice = product.find(({ id }) => id === productObj.id).price;
      ol.appendChild(createCartItemElement(productObj));
    });
  });
}

window.onload = () => {
  loadProducts();
  addProductOnCart();
};
