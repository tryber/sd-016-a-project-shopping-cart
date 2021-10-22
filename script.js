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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
 // remover item do carrinho
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function searchProducts (product) {
  const dataResult = await fetchProducts(product);
  const classItems = document.querySelector('.items');
  dataResult.results.forEach((item) => {
    const productObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const section = createProductItemElement(productObject);
    classItems.appendChild(section);
  });
}

/* const buttonAdd = document.querySelector('.item__add');
buttonAdd.addEventListener('click', searchProducts) */

/* async function searchItemProducts(idItem) {
  const dataItemResult = await fetchItem(idItem);
  const classCartItems = document.querySelector('.cart__items');
  dataItemResult.forEach((item) => {
    const productItemObject = {
      sku: item.id,
      name: item.title,
      salePrice: item.price,
    }
    const ol = createCartItemElement(productItemObject);
    classCartItems.appendChild(ol);
  })
}   */

window.onload = () => {
  searchProducts('computador');
 };
