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

function cartItemClickListener(sku) {  
  let remo = document.querySelectorAll('li');
  let tt = document.querySelector('.cart__items');  
  for(let i = 0; i < remo.length; i++) {
    if(remo[i].innerText.indexOf(sku) !== -1) {
      tt.removeChild(remo[i]);
    }
  }
}

function createCartItemElement(sku, name, salePrice) {
  //console.log(salePrice)
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', () => cartItemClickListener(sku));
  return li;
}

async function addcar(sku, name) {
  localStorage.setItem(`${sku}`, `${name}`);
  //console.log(localStorage.length);
  const result2 = await fetchItem(sku);
  const cariten = document.querySelector('.cart__items');
  //console.log(parseInt(result2.price))
  cariten.appendChild(createCartItemElement(sku, name, parseInt(result2.price)));
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

/*
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
*/

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
};
