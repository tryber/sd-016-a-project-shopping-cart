const classCartItems = document.querySelector('.cart__items'); 

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

// consultei código do Brunão
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(classCartItems.innerHTML); // AQUIIIIIII
 } 

function createCartItemElement({ sku, name, salePrice }) { 
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener); 
  classCartItems.appendChild(li); 
  saveCartItems(classCartItems.innerHTML); // AQUIIIIIII
  return li;
}

const addToCart = async (id) => {
  const objectFechItem = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = objectFechItem;
  const cartItemCreate = createCartItemElement({ sku, name, salePrice });
  classCartItems.appendChild(cartItemCreate);
   saveCartItems(classCartItems.innerHTML); // AQUIIIIII
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonAddItem = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonAddItem.addEventListener('click', () => {
    addToCart(sku);
  }); 
  section.appendChild(buttonAddItem);

  return section;
}

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

async function searchProducts(product) {
  const dataResult = await fetchProducts(product);
  const classItems = document.querySelector('.items');
  dataResult.results.forEach((item) => {
    const productObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const section = createProductItemElement(productObject);
    classItems.appendChild(section);
  });
}

function buttonEmptyCart() {
  const catchButton = document.querySelector('.empty-cart');
  catchButton.addEventListener('click', () => {
    classCartItems.innerHTML = '';
    saveCartItems(classCartItems.innerHTML);
  });
}
buttonEmptyCart();

// passar por todos os itens do carrinho e pegar a propriedade price, soma-la e mostrar no paragrafo:
/* function sumItemsCart() {
  const listPrice = Array.from(classCartItems.children);
  listPrice.reduce((acc, currentValue) => {
    console.log(currentValue);
  }, []);
} */

function loadPage() { // AQUIIIIIIIIII
  classCartItems.innerHTML = getSavedCartItems(); 
  classCartItems.addEventListener('click', cartItemClickListener);
} 

window.onload = () => {
  searchProducts('computador');
  // sumItemsCart();
  loadPage();
 };