function cartItemClickListener(e) {
    document.querySelectorAll('.cart__items')[0].removeChild(e.target);  
    saveCartItems(document.querySelectorAll('.cart__items')[0].innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  document.querySelectorAll('.cart__items')[0].appendChild(li);

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
    saveCartItems(document.querySelectorAll('.cart__items')[0].innerHTML);
  }));
}));
};

chamaFetchProducts();

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function removeLocalStorEol(e) {
  document.querySelectorAll('.cart__items')[0].removeChild(e.target);
  saveCartItems(document.querySelectorAll('.cart__items')[0].innerHTML);
}
window.onload = () => {
  document.querySelectorAll('.cart__items')[0].innerHTML = getSavedCartItems();
  fetch('https://api.mercadolibre.com/items/MLB1532308540').then((data) => {
    for (cont = 0; cont < document.querySelectorAll('.cart__items')[0].children.length; cont += 1) {
    document.querySelectorAll('.cart__item')[cont].addEventListener('click', removeLocalStorEol);
    }
  });
};
