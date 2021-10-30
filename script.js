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

function cartItemClickListener(id, sku, title, price) {
  const remo = document.querySelectorAll('li');
  const tt = document.querySelector('.cart__items');  
  for (let i = 0; i < remo.length; i += 1) {
    if (remo[i].id == id) {
      saveCartItems( id, sku, title, price);
      tt.removeChild(remo[i]);

    }
  }
}

function createCartItemElement(id, sku, name, salePrice) {
  const li = document.createElement('li');
  li.id = id;
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', () => cartItemClickListener(id, sku, name, salePrice));
  return li;
}

async function addcar(sku) {
  const id = Math.floor(Math.random() *256);
  const result2 = await fetchItem(sku);
  const cariten = document.querySelector('.cart__items');
  //console.log(result2)
  saveCartItems( id, `${sku}`, `${result2.title}`, result2.price)
  cariten.appendChild(createCartItemElement(id, sku, result2.title, result2.price));
}

function createProductItemElement(sku, name, image) {
  const section = document.createElement('section');
  section.className = 'item';
  const proCar = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  proCar.addEventListener('click', () => addcar(sku, name));
  section.appendChild(proCar);
  return section;
}

window.onload = async () => {
  const para = 'computador';
  const result = await fetchProducts(para);
  const sku = result.map((id) => id.id);
  const name = result.map((name2) => name2.title);
  const image = result.map((image2) => image2.thumbnail);
  const ee = document.querySelector('.items');
  for (let i = 0; i < result.length; i += 1) {
    ee.appendChild(createProductItemElement(sku[i], name[i], image[i]));    
  }
  getSavedCartItems(localStorage.getItem('cartItems'), 
   createCartItemElement)
};
