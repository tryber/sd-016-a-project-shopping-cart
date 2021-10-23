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
  const cart = document.querySelector('.cart__items');

}

function createCartItemElement({ sku, name, salePrice }) { 
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemToCart(id) {
  const cart = document.querySelector('.cart__items');
  const data = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = data;
  const product = createCartItemElement({ sku, name, salePrice });
  cart.appendChild(product);
}

// Código feito com a ajuda de Vitor Brandão, Renan Souza, Lucas Alves, Matheus Benini, Italo Moraes, Rafael Feliciano, Julia Barcelos
function createProductItemElement({ sku, name, image }) {  
    const getSectionItems = document.querySelector('.items');
    const section = document.createElement('section');
    section.className = 'item';
  
    section.appendChild(createCustomElement('span', 'item__sku', sku));
    section.appendChild(createCustomElement('span', 'item__title', name));
    section.appendChild(createProductImageElement(image));
    
    const newButton = section
      .appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
    newButton.addEventListener('click', () => addItemToCart(sku));

    section.appendChild(newButton);
    getSectionItems.appendChild(section);
    return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function searchProducts(product) {
  const data = await fetchProducts(product);
  const sectionItem = document.querySelector('.items');
  data.results.forEach((productItem) => {
    const { id: sku, title: name, thumbnail: image } = productItem;
    const item = createProductItemElement({ sku, name, image });
    sectionItem.appendChild(item);
  });
}

window.onload = () => { 
  searchProducts('computador');
  selectButton();
};
