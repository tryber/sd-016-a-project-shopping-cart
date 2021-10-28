const olCarItem = document.querySelector('.cart__items');
const buttonClear = document.querySelector('.empty-cart');

buttonClear.addEventListener('click', () => {
  olCarItem.innerHTML = '';
});

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
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addCarItem(click) {
  // Retirado do repostório: https://github.com/tryber/sd-016-a-project-shopping-cart/blob/denilson-santuchi-shopping-cart/script.js
  const id = click.path[1].childNodes[0].innerText;
  const resultForCarItem = await fetchItem(id);
  const objectCarItem = {
    sku: resultForCarItem.id,
    name: resultForCarItem.title,
    salePrice: resultForCarItem.price,
  };
  const itemForCart = createCartItemElement(objectCarItem);
  olCarItem.appendChild(itemForCart);
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItens = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItens.appendChild(productItem);
  });
  const buttonAddCart = document.querySelectorAll('.item__add');
  buttonAddCart.forEach((item) => {
    item.addEventListener('click', addCarItem);
  });
}

window.onload = () => {
  searchProducts('computador');
};
