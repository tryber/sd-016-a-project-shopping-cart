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

async function addItemToCart(item) {
  const loadItem = await fetchItem(item);
  console.log(loadItem);
  const olCartItems = document.querySelector('.cart__items');
  const { id: sku, title: name, price: salePrice } = loadItem;
  const li = createCartItemElement({ sku, name, salePrice });
  olCartItems.appendChild(li);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const createButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(createButton);
  createButton.addEventListener('click', () => addItemToCart(sku));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // https:github.com/tryber/sd-015-b-project-pixels-art/pull/113/commits/a9120a2955bfe5cd6974bd8a36a3e86e76b970e7
    // for(i=0; i<selectColor.length; i+=1){
    //   if(selectColor[i].classList.contains("selected")){
    //     selectColor[i].classList.toggle("selected");
    //   }
    // }
    // select.target.classList.toggle("selected");
  
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

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

window.onload = () => {
  searchProducts('computador');
};
