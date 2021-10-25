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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) { 
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Dica be requisito 1: thread Slack
async function searchProducts(product) {
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
}

// requisito 2
const page = document.querySelector('body'); // para usar o addEventListener
const cartItems = document.querySelector('ol.cart__items'); 
const sumOfPrices = document.querySelector('.sum-of-prices'); // para requisito 5
const clearBtn = document.querySelector('.empty-cart'); // para requisito 6

// requisito 5
const sumOfPricesOfItems = () => {
  const itemsOfCart = cartItems.childNodes;
  if (itemsOfCart.length === 0) {
      sumOfPrices.innerText = 0;
  } else {
    const prices = [];
    itemsOfCart.forEach((item) => {
      const itemDescription = item.innerText;
      const localOfPrice = itemDescription
      .slice(itemDescription.indexOf('PRICE: $') + 'PRICE:$'.length); 
      const price = parseFloat(localOfPrice); 
      prices.push(price);
    });
    const total = prices.reduce((acc, value) => acc + value);
      sumOfPrices.innerText = total;
  }
};  

const putInCart = (foundProduct) => { // para colocar os itens no carrinho
  const { id: sku, title: name, price: salePrice } = foundProduct;
  const product = { sku, name, salePrice };
  const item = createCartItemElement(product);
  cartItems.appendChild(item);
  saveCartItems(cartItems.innerHTML); // **REQUISITO 4 - para salvar no storage os itens que estao no carrinho
};

const selectProduct = async (element) => { // para selecionar os itens 
  const product = element.target.parentElement;
  const productId = product.firstChild.innerText;
  const setProduct = await fetchItem(productId);
  putInCart(setProduct);
  sumOfPricesOfItems(); // **REQUISITO 5 - Atualizar total do carrinho
};

page.addEventListener('click', (element) => { // evento para acionar selectProduct e jogar itens no carrinho
  if (element.target.classList.contains('item__add')) {
    selectProduct(element);
  }
  });

// requisito 3
const removeItemFromCart = (element) => { // funcao para eliminar filhos da ol no carrinho 
  const item = element.target;
  cartItems.removeChild(item);
  saveCartItems(cartItems.innerHTML); // **REQUISITO 4 - para salvar no storage os itens que estao no carrinho
  sumOfPricesOfItems(); // **REQUISITO 5 - Atualizar total do carrinho
};

page.addEventListener('click', (element) => { // eliminar filhos da ol ao clicar no mesmo 
  if (element.target.classList.contains('cart__item')) {
    removeItemFromCart(element);
  }
  });

// requisito 4
const saveItensFromCartInStorage = () => { // mantem no html a configuracao atual dos itens que estao no carrinho
  const inner = getSavedCartItems();
  cartItems.innerHTML = inner;
  };

  // requisito 6
const clearItemsOfCart = () => {
  cartItems.innerHTML = '';
  saveCartItems('');
  sumOfPricesOfItems();
};

clearBtn.addEventListener('click', clearItemsOfCart);

// implementar as funcoes na ordem dentro do window onload
window.onload = () => { 
  searchProducts('computador');
  saveItensFromCartInStorage();
  sumOfPricesOfItems();
};