const cartList = document.querySelector('.cart__items');

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
  saveCartItems(cartList.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function itemToBuy(id) {
  const cartItems = await fetchItem(id);
  const itemsId = {
    sku: cartItems.id,
    name: cartItems.title,
    salePrice: cartItems.price,
  };

  cartList.appendChild(createCartItemElement(itemsId));
  saveCartItems(cartList.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  /**
   * Consultei o repositório da Cris Souza para resolver essa parte.
   * Link- https://github.com/tryber/sd-016-a-project-shopping-cart/pull/103/commits/f38badebf20f5af0f8f3594981dbe9f5d7e02cd7
   */
  const addCartButton = createCustomElement(
    'button',
    'item__add',
    'Adicionar ao carrinho!',
  );
  addCartButton.addEventListener('click', () => itemToBuy(sku));
  section.appendChild(addCartButton);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

/**
 * Consultei o vídeo gravado pelo Bernardo Salgueiro para resolver essa parte.
 * Link- https://app.slack.com/client/TMDDFEPFU/C02A8CKT31U/thread/C02A8CKT31U-1634781501.006900
 * */

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemCatalog = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const section = createProductItemElement(itemCatalog);
    sectionItems.appendChild(section);
  });
}

/**
 * Consultei o repositório da Cris Souza para resolver essa parte.
 * Link- https://github.com/tryber/sd-016-a-project-shopping-cart/pull/103/commits/de4a403641227f20bc8ccc62148eefac395c9008
 */

const refreshPage = () => {
  const getResult = getSavedCartItems();
  cartList.innerHTML = getResult;
};

const restoreEventListener = () => {
  cartList.addEventListener('click', cartItemClickListener);
};

const clearButton = document.querySelector('.empty-cart');

const actionClearButton = () => {
  cartList.innerHTML = '';
  saveCartItems(cartList.innerHTML);
};
  clearButton.addEventListener('click', actionClearButton);

window.onload = () => {
  searchProducts('computador');
  refreshPage();
  restoreEventListener();
};
