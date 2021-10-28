const cartItems = '.cart__items';
const cartItem = '.cart__item';
const endPoint = 'https://api.mercadolibre.com/items/MLB1532308540';

let divPrecoTotal;

function precoTotalFunction() {
  let precoTotal = 0;    
  fetch(endPoint).then(() => {
  for (let cont = 0; cont < document.querySelectorAll(cartItems)[0].children.length; cont += 1) {
    console.log(document.querySelectorAll(cartItem)[cont].innerHTML);
    
    precoTotal += parseFloat(document.querySelectorAll(cartItems)[0]
    .children[cont].innerHTML.substring(
      document.querySelectorAll(cartItem)[cont].innerHTML.indexOf('$') + 1,
       document.querySelectorAll(cartItem)[cont].innerHTML.length,
      ));
   }
   document.querySelector('.total-price').innerHTML = precoTotal;
  });
}

function apagaTodosCart() {
  fetch(endPoint).then(() => {
    document.querySelectorAll('.empty-cart')[0].addEventListener('click', () => {
      localStorage.clear();
      precoTotalFunction();
      for (cont = 0; cont < document.querySelectorAll(cartItem).length; cont += 0) {
      document.querySelectorAll('.cart__items')[0]
      .removeChild(document.querySelectorAll(cartItem)[0]);
      }
    });
  });
}

apagaTodosCart();

function removeLocalStorEol(e) {
  document.querySelectorAll(cartItems)[0].removeChild(e.target);
  saveCartItems(document.querySelectorAll(cartItems)[0].innerHTML);

  precoTotalFunction();
}

function cartItemClickListener(e) {
  removeLocalStorEol(e);
    precoTotalFunction();
  }
  
function createCartItemElement({ sku, name, salePrice }) {
  li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  document.querySelectorAll(cartItems)[0].appendChild(li);

  return li;
}

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
  document.body.appendChild(section);
  return section;
}
const chamaFetchProducts = async () => {
  await fetchProducts('computador').then((produtos) => produtos.results
  .forEach((element, index) => {
  obj = ({ sku: [element.id], name: [element.title], image: [element.thumbnail] });
  createProductItemElement(obj);

  document.querySelectorAll('.item__add')[index].addEventListener('click', (e) =>
  fetchItem(e.target.parentNode.children[0].innerHTML)  
  .then((data) =>
  createCartItemElement(({ sku: data.id, name: data.title, salePrice: data.price })))
  .then(() => {
    saveCartItems(document.querySelectorAll(cartItems)[0].innerHTML);
    precoTotalFunction();
  }));
}));
};

chamaFetchProducts();

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// eslint-disable-next-line max-lines-per-function
window.onload = () => {
  document.querySelectorAll(cartItems)[0].innerHTML = getSavedCartItems();
  fetch(endPoint).then(() => {
    for (cont = 0; cont < document.querySelectorAll(cartItems)[0].children.length; cont += 1) {
         document.querySelectorAll(cartItem)[cont].addEventListener('click', removeLocalStorEol);
    }
    let precoTotal = 0;
    for (let cont = 0; cont < document.querySelectorAll(cartItems)[0].children.length; cont += 1) {
      precoTotal += parseFloat(document.querySelectorAll(cartItems)[0]
      .children[cont].innerHTML.substring(
        document.querySelectorAll(cartItems)[0].children[cont].innerHTML.indexOf('$') + 1,
         document.querySelectorAll(cartItems)[0].children[cont].innerHTML.length,
        ));  
        }
    divPrecoTotal = document.createElement('div');
    divPrecoTotal.classList.add('total-price');
    divPrecoTotal.innerHTML = precoTotal;
    document.body.appendChild(divPrecoTotal);  
  });
};
