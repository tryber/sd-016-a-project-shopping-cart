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
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// function cartItemClickListener(event) {
//   // coloque seu código aqui
// }

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Agradecimento especial ao Bernardo Salgueiro (Instrutor - T16) por ter feito um video ajudando a desenrolar o requisito 1.
const searchProduct = async (product) => {
  const search = await fetchProducts(product);
  const items = document.querySelector('.items');

  search.results.forEach((result) => {
    const item = createProductItemElement({
      sku: result.id, name: result.title, image: result.thumbnail,
    });

    items.appendChild(item);
  });
};

const getProduct = async (select) => {
  if (select.target.classList.contains('item__add')) {
    const cartList = document.querySelector('.cart__items');
    const product = await fetchItem(select.target.parentElement.firstChild.textContent);
    const item = createCartItemElement({
      sku: product.id, name: product.title, salePrice: product.price,
    });

    cartList.appendChild(item);
  }
};

window.onload = () => {
  searchProduct('computador');
  document.addEventListener('click', getProduct);
};
