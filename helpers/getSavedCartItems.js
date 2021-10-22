const fetchItemReplica = async (id) => {
  // didn't allowed me to require fetchItem
  if (id === undefined) {
    throw new Error('You must provide an url');
  }

  return fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((productInfo) => productInfo.json())
    .then((product) => product)
    .catch((error) => error);
};

function cartItemClickListenerReplica(event) {
  return event.target.remove();
}

function createCartItemElementReplica({ sku, name, salePrice }) {
  // didn't allowed me to require createCartItemElement
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListenerReplica);
  return li;
}

// Tentar refatorar usando as funções já prontas no script.js

const getSavedCartItems = () => {
  const itemsIds = localStorage.getItem('cartItems');
  if (itemsIds === null) return 0;
  const itemsIdsArray = itemsIds.split(',').filter((item) => item !== '');
  const cart = document.querySelector('ol.cart__items');
  const createNewCart = () => {
    itemsIdsArray.forEach(async (id) => {
      const itemInfo = async () => fetchItemReplica(id).then((result) => {
        const item = {
          sku: result.id, name: result.title, salePrice: result.price,
        };
        cart.appendChild(createCartItemElementReplica(item));
      });
      await itemInfo();
    });
  };
  createNewCart();
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
