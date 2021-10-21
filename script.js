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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  event.target.remove();
}

// REQUISITO 2

function createCartItemElement({ sku, name, salePrice }) {
  const olItems = document.querySelector('.cart__items');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  olItems.appendChild(li);
}

// Função desenvolvida Req.2

async function buttonRequisition(sku) {
  const findTheProduct = await fetchItem(sku);
  console.log(findTheProduct);
  const { title: name, price: salePrice } = findTheProduct;

  createCartItemElement({ sku, name, salePrice });
  // const olItems = document.querySelector('.cart__items');
 
  // findTheProduct.forEach((item) => {
  //   const olObject = {
  //     sku: sku,
  //     name: item.title,
  //     salePrice: item.price,
  //   };
  //   const createLi = createCartItemElement(olObject);
  //   olItems.appendChild(createLi);
  // });
}

// Ad

// REQUISITO 1

function createProductItemElement({ id: sku, title: name, tumbnail: image }) {
  const section = document.createElement('section');
  const mainSection = document.querySelector('.items');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  const newButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(newButton);
  newButton.addEventListener('click', () => {
    buttonRequisition(sku);
  });
  
  section.appendChild(newButton);
  mainSection.appendChild(section);
  return section;
}

// Função desenvolvida Req.1
async function searchProduct(product) {
  const searchResult = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchResult.results.forEach((item) => {
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
  searchProduct('computador');
  // buttonRequisition('MLB1341706310');
};
