function createProductImageElement(imageSource) {
  const conteiner = document.createElement('div');
  conteiner.className = 'conteiner_img';

  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  conteiner.appendChild(img);
  // return img;
  return conteiner;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'priceProduct', `R$ ${salePrice}`));
  // section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  const buttonItem = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonItem.addEventListener('click', () => itemProducts(sku));
  section.appendChild(buttonItem);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function cartItemClickListener(event) {
// vai ser para remover o item
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function serchProducts(product) { // essa e uma funcao assincrona
  const searchData = await fetchProducts(product); // chamada da funcao fetchproduts.js
  const sectionItems = document.querySelector('.items'); // Alvo é a classe items no html
  searchData.results.forEach((item) => { // results é palcançar os dados no array
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
      salePrice: item.price,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

window.onload = () => { 
  serchProducts('computador');
};
