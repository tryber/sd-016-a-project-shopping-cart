let priceTotal = 0;
const aque = document.querySelector('.cart__items');
const empt = document.querySelector('.empty-cart');
localStorage.setItem('priceTotal', priceTotal);
const tt = document.createElement('div');
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
  for (let i = 0; i < remo.length; i += 1) {
    if (Number(remo[i].id) === id) {
      aque.removeChild(remo[i]);
      saveCartItems(id, sku, title, price);      
    }
  }
}

function createCartItemElement(id, sku, name, salePrice) {
  priceTotal += salePrice;
  localStorage.setItem('priceTotal', priceTotal);
  tt.innerText = priceTotal;
  const li = document.createElement('li');
  li.id = id;
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', () => {
    cartItemClickListener(id, sku, name, salePrice);
    priceTotal -= salePrice;
    tt.innerText = priceTotal;
   });  
  return li;
}

async function addcar(sku) {
  const id = Math.floor(Math.random() * 256);
  const result2 = await fetchItem(sku);
  const cariten = aque;
  saveCartItems(id, `${sku}`, `${result2.title}`, result2.price);
  cariten.appendChild(createCartItemElement(id, sku, result2.title, result2.price));
}

function createProductItemElement(sku, name, image) {
  tt.className = 'total-price';
  document.querySelector('.cart').appendChild(tt);
  const section = document.createElement('section');
  section.className = 'item';
  const proCar = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  proCar.addEventListener('click', () => addcar(sku));
  section.appendChild(proCar);
  return section;
}

function remov() {
  const rr = localStorage.getItem('cartItems');
  const iii = JSON.parse(rr);
  for (let i = 0; i < iii.length; i += 1) {
    cartItemClickListener(iii[i].id, iii[i].sku, iii[i].name, iii[i].price);
  priceTotal = 0;
  tt.innerText = priceTotal;
  }
 }

function carr(loand) {
  const pppp = document.querySelector('.items');
  const uu = document.createElement('loading');
  
  if (loand === false) {    
     const kk = document.querySelector('.loading');
     kk.remove();
  } else {
    pppp.appendChild(uu); 
  uu.innerHTML = 'loading';
uu.className = 'loading';
}
}

window.onload = async () => {
  carr(true);
  const crii = document.querySelector('.items');
  const para = 'computador';
  const result = await fetchProducts(para);
  const sku = result.map((id) => id.id);
  const name = result.map((name2) => name2.title);
  const image = result.map((image2) => image2.thumbnail);
  
  tt.innerText = priceTotal;
  for (let i = 0; i < result.length; i += 1) { 
    crii.appendChild(createProductItemElement(sku[i], name[i], image[i]));     
  } 
  carr(false); 
  getSavedCartItems(localStorage.getItem('cartItems'), 
   createCartItemElement);
   empt.addEventListener('click', remov);   
};
