// REQUISITO 2 e 3 FEITO NA SALA COM A FUMAGALLI(COM A INICIATIVA DE AJUDAS OS ALUNOS EM RECUPERAÇÃO <3)

const listOl = document.querySelector('ol');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  // console.log(event.target)
  // const removeCartItem = document.querySelector('li');
  // removeCartItem.parentNode.removeChild( removeCartItem )
  event.target.remove();
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createProductItemElement(itemObj) {
  const { sku, name, image } = itemObj; 
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => 
  listOl.appendChild(createCartItemElement(itemObj)));
  section.appendChild(button);
  // const button = document.querySelector('.item__add');
  // button.addEventListener('click', (event) => {
  //   const { target } = 
  // })

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function searchProduct(product) {
  const section = document.querySelector('.items');
  
  const searchData = await fetchProducts(product);
  searchData.results.forEach((item) => {
    const itemObj = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const creatComputerElement = createProductItemElement(itemObj);
    section.appendChild(creatComputerElement);
  });
}

// async function addCartItem() {
//   const require = await fetchItem();
//   const button = document.querySelector('item__add');
//   const getOl = document.querySelector('.cart__items');
//   console.log(button)
// }
// addCartItem()
   
// }

window.onload = () => { 
  searchProduct('computador');
};
