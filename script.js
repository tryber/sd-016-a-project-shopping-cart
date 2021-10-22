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

function createCartItemElement({ sku, name, salePrice }) { // thumbnail, title e price
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `${sku}   
  ${name} 
  R$${salePrice}
  
  `;
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
const cart = document.querySelector('section.cart'); 

const putInCart = (foundProduct) => { // para colocar os itens no carrinho
  const { id: sku, title: name, price: salePrice } = foundProduct;
  const product = { sku, name, salePrice };
  const item = createCartItemElement(product);
  cart.appendChild(item);
};

const selectProduct = async (element) => { // para selecionar os itens 
  const product = element.target.parentElement;
  const productId = product.firstChild.innerText;
  const findProduct = await fetchItem(productId);
  putInCart(findProduct);
};

page.addEventListener('click', (element) => { // evento para acionar selectProduct e jogar itens no carrinho
  if (element.target.classList.contains('item__add')) {
    element.preventDefault();
    selectProduct(element);
  }
  });

// implementar as funcoes na ordem dentro do window onload
window.onload = () => { 
  searchProducts('computador');
};