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
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const getOlItemElements = document.querySelector('.cart__items');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  getOlItemElements.appendChild(li);

  li.addEventListener('click', cartItemClickListener);
}

const addItemToCart = async (sku) => {
  const allItens = await fetchItem(sku);
  const { title: name, price: salePrice } = allItens;
  createCartItemElement({ sku, name, salePrice });
};

function createProductItemElement({ sku, name, image }) {
  const buttonAddToCart = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  const section = document.createElement('section');
  const productSection = document.querySelector('.items');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  buttonAddToCart.addEventListener('click', () => {
    addItemToCart(sku);
  });
  section.appendChild(buttonAddToCart);
  productSection.appendChild(section);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const createCartItems = () => {
  fetchProducts('computador').then((productList) => {
    const sectionItems = document.querySelector('.items');
  
    for (let index = 0; index < productList.length; index += 1) {
      const currentProduct = { 
        sku: productList[index].id,
        name: productList[index].title,
        image: productList[index].thumbnail,
      };
      sectionItems.appendChild(createProductItemElement(currentProduct));
    }
  });
};

window.onload = () => {
  createCartItems();
};
