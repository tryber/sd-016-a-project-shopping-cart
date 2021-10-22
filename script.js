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

function cartItemClickListener(event) {
  event.target.remove();
}

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);

  return li;
};

async function addToCart(id) {
  const request = await fetchItem(id);
  const getOl = document.querySelector('.cart__items');
  const { id: sku, title: name, price: salePrice } = request;
  const cartList = createCartItemElement({ sku, name, salePrice });
  getOl.appendChild(cartList);
}

const createProductItemElement = ({ sku, name, image }) => {
  const getSectionItems = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const clickableButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho');
  clickableButton.addEventListener('click', () => {
    addToCart(sku);
  });
  section.appendChild(clickableButton);
  getSectionItems.appendChild(section);
  return section;
};

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
 */

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

window.onload = () => {
  searchProducts('computador');
};
