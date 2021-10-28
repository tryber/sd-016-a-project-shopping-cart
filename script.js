/* Nota de agradecimento ao Lenny e ao Bernardo Salgueiro por terem me feito enxergar 
o quão extenso e pouco prático o meu código estava ficando!!!! Muito obrigado pela ajuda! */
const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
}
let total = 0;
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => {
    cartItemClickListener(event);
    const priceProduct = +salePrice;
    total -= priceProduct;
    if (total < 0) total = 0;
    totalPrice.innerHTML = `${total}`;
  });
  return li;
}

const findProduct = async (nameOfProduct) => {
  const find = await fetchProducts(nameOfProduct);
  find.results.forEach((result) => {
    const item = createProductItemElement({
      sku: result.id, name: result.title, image: result.thumbnail,
    });
    items.appendChild(item);
  });
};
const catchProduct = async (element) => {
  if (element.target.classList.contains('item__add')) {
    const product = await fetchItem(element.target.parentElement.firstChild.textContent);
    const item = createCartItemElement({
      sku: product.id, name: product.title, salePrice: product.price,
    });
    const priceProduct = +product.price;
    total += priceProduct;
    totalPrice.innerHTML = total;
    cartItems.appendChild(item);
    saveCartItems(cartItems.innerHTML);
  }
};

const clearCart = () => {
  localStorage.removeItem('cartItems');
  localStorage.removeItem('totalInCart');
  cartItems.innerHTML = '';
  totalPrice.innerHTML = 'Seu carrinho está vazio :(';
};

const clearButton = document.querySelector('.empty-cart');
clearButton.addEventListener('click', () => {
  clearCart();
});

window.onload = () => {
 findProduct('computador');
 document.addEventListener('click', catchProduct);
 if (localStorage.getItem('cartItems')) {
   cartItems.innerHTML = getSavedCartItems();
   cartItems.childNodes.forEach((product) => 
   product.addEventListener('click', cartItemClickListener));
 }
};
