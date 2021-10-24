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
  if (element === 'button') {
    e.addEventListener('click', (evt) => {
      const { parentElement } = evt.target;
      const idFind = parentElement.childNodes[0].innerText;
      fetchItem(idFind).then((data) => {
        const { id: sku, title: name, price: salePrice } = data;
        const objResult = {
          sku, name, salePrice,
        };
        const cartEl = document.querySelector('.cart__items');
        cartEl.appendChild(createCartItemElement(objResult));
      });
    });
  }
  return e;
}

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
 // chame a função fetchItem após conseguir o id pelo event
 
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  const { results } = searchData;
  results.forEach((item) => {
    const {
       id: sku, 
       title: name, 
       thumbnail: image,
      } = item;
    const itemObject = { 
      sku,
      name,
      image,
    }; 
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

window.onload = () => { 
  searchProducts('computador');
};