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

// function cartItemClickListener(event) {
 
// }

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // li.addEventListener('click', cartItemClickListener);
  return li;
}

const adicionaAoCarrinho = async (itemId) => {
  const search = await fetchItem(itemId);
  const ol = document.querySelector('.cart__items');
  const obj = { sku: search.id, name: search.title, salePrice: search.price };
  const itemElement = createCartItemElement(obj);
  ol.appendChild(itemElement);
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addButton.addEventListener('click', () => {
   adicionaAoCarrinho(sku);
  });
  section.appendChild(addButton);

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// Precisei assistir ao vídeodo Bê para começar a fazer.

const searchProducts = async (argumento) => { 
  const searchData = await fetchProducts(argumento);
  const sectionItens = document.querySelector('.items');
  searchData.results.forEach((element) => {
    const itenObject = { sku: element.id, name: element.title, image: element.thumbnail };
    const productItem = createProductItemElement(itenObject);
    sectionItens.appendChild(productItem);
  });
  return sectionItens;
}; 

window.onload = async () => { 
  searchProducts('computador'); 
};
