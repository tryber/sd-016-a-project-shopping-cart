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
  const throwItem = getOlList();
  throwItem.removeChild(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const carrinho = getOlList();
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  carrinho.appendChild(li);
  return li;
}

const addItemCart = async (sku) => {
  const carrinho = getOlList();
  const returnFetchItem = await fetchItem(sku);
  console.log(returnFetchItem);
  const { title: name, price: salePrice } = returnFetchItem;
  const getList = createCartItemElement({ sku, name, salePrice });
  console.log(getList);
  carrinho.appendChild(getList);
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addButton.addEventListener('click', () => {
  addItemCart(sku);
  });
  section.appendChild(addButton);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function searchProducts(product) {
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
}
window.onload = () => {
  searchProducts('computador');
  const getOlList = () => document.querySelector('.cart__items'); 
  };
  