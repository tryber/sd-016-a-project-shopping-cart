const cartList = document.querySelector('.cart_items');
const button = document.querySelector('.empty-cart');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const cartItemClickListener = (event) => {
  event.target.remove();
  itemsSave(cartList.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addProductCart = async (sku) => {
  const fetch = await fetchItem(sku);
  console.log(fetch);
  const { title: name, price: salePrice } = fetch;
  createCartItemElement({ sku, name, salePrice });
};
/* Como eu fiz, alterado para como o BE fez.
const fetchUrl = async () => {
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    const products = await response.json();
    const sectionItems = await document.querySelector('.items');
    await products.results.forEach((element) => {
      const { id, title, thumbnail } = element;
      sectionItems.appendChild(createProductItemElement({ id, title, thumbnail }));
    });
  } catch (error) {
    window.alert('Ocorreu um erro, Desculpa vamos verificar!!');
  }
}; */

const searchProducts = async (product) => {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
};

const clearButton = () => {
  cartList.innerHTML = '';
  itemsSave(cartList.innerHTML);
};

button.addEventListener('click', clearButton);

window.onload = () => {
  searchProducts('computador');
};
