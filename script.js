const totalPrice = [];

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
  // coloque seu código aqui
  const cartOl = document.querySelector('.cart__items');
  cartOl.removeChild(event.target);
}

function subtractFromTotalPrice(totalPriceArray, itemSalePrice) {
  const totalPriceSubtracted = totalPriceArray.reduce(
    (acc, curr) => acc + curr,
  );
  const index = totalPriceArray.indexOf(itemSalePrice);
  if (index > -1) {
    totalPriceArray.splice(index, 1); // splice recebe o índice por onde começar a modificar o array, e o número de elementos à serem deletados.
  }
  console.log(totalPriceArray);
  console.log((totalPriceSubtracted - itemSalePrice).toFixed(2));
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.addEventListener('click', () => {
    subtractFromTotalPrice(totalPrice, salePrice);
  });
  return li;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement(
    'button',
    'item__add',
    'Adicionar ao carrinho!',
  );
  button.addEventListener('click', async () => {
    const formatedData = await fetchItem(sku);
    const cartElement = createCartItemElement(formatedData);
    const cart = document.querySelector('.cart__items');
    cart.appendChild(cartElement);
  });
  section.appendChild(button);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function addItemstoPage() {
  data = await fetchProducts('computador');
  const sectionOfItems = document.querySelector('.items');
  data.results.forEach((result) => {
    const { id: sku, title: name, thumbnail: image } = result;
    const sectionItem = createProductItemElement({ sku, name, image });
    sectionOfItems.appendChild(sectionItem);
  });
}

async function addTotalPrice(totalPriceArray) {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const sku = getSkuFromProductItem(button.parentNode);
      const response = await fetch(`https://api.mercadolibre.com/items/${sku}`);
      const data = await response.json();
      const { price } = data;
      totalPriceArray.push(price);
      console.log(totalPriceArray);
      const totalPriceAdded = totalPriceArray.reduce((acc, curr) => acc + curr);
      console.log(totalPriceAdded.toFixed(2));
    });
  });
}

window.onload = async () => {
  await addItemstoPage();
  await addTotalPrice(totalPrice);
};
