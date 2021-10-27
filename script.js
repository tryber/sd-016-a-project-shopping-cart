const ol = document.querySelector('.cart__items');
const cart = document.querySelector('.cart');

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

function attPreco() {
const preco = document.querySelector('.total-price');
const valor = localStorage.getItem('valorTotal') || 0;
  const texto = valor;
preco.innerText = texto;
}

function addInLocalStorage() {
  if (ol.childElementCount > 0) {
    saveCartItems(ol.innerText);
  } else {
    localStorage.removeItem('cartItems');
  }
} // Caso ol tiver filhos (ex: li) >> Será Adicionado no local storage

function somaPreco(preco) {
  let taNoLocalStorage = parseFloat(localStorage.getItem('valorTotal')) || 0;
  taNoLocalStorage += preco;
  localStorage.setItem('valorTotal', taNoLocalStorage);
}

function subtraiPreco(preco) {
  if (preco) {
    let taNoLocalStorage = parseFloat(localStorage.getItem('valorTotal'));
    taNoLocalStorage -= parseFloat(preco);
    localStorage.setItem('valorTotal', taNoLocalStorage);
  } else { localStorage.setItem('valorTotal', 0); }
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.addEventListener('click', () => {
    li.remove();
    addInLocalStorage();
    subtraiPreco(salePrice);
    attPreco();
  });
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  return li;
}

const adicionaAoCarrinho = async (itemId, callback) => {
  const search = await fetchItem(itemId);
  const obj = { sku: search.id, name: search.title, salePrice: search.price };
  const itemElement = createCartItemElement(obj);
  await ol.appendChild(itemElement);
  callback();
};

function createProductItemElement({ sku, name, image, preco }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addButton = createCustomElement(
    'button',
    'item__add',
    'Adicionar ao carrinho!',
  );
  addButton.addEventListener('click', () => {
    adicionaAoCarrinho(sku, addInLocalStorage);
    somaPreco(preco);
    attPreco();
  });
  section.appendChild(addButton);

  return section;
}

function valorCarrinho() {
  const valor = localStorage.getItem('valorTotal') || 0;
  const texto = 'VALOR NO CARRINHO:';
  cart.appendChild(createCustomElement('h5', 'text-total-price', texto));
  cart.appendChild(createCustomElement('h5', 'total-price', valor));
  return cart;
}

function clearCart() {
  const buttonClear = document.querySelector('.empty-cart');
  buttonClear.addEventListener('click', () => {
    const tamanho = ol.childElementCount;
    for (let i = tamanho; i > 0; i -= 1) {
      ol.lastChild.remove();
      localStorage.removeItem('cartItems');
      subtraiPreco();
      attPreco();
    }
  });
}

function getElementReload() {
  const arrayStringsLocalStorage = getSavedCartItems();
  if (arrayStringsLocalStorage !== null) {
    const textProduct = arrayStringsLocalStorage.split('\n');
    textProduct.forEach((textoLi) => {
      const arrayElement = textoLi.split('$');
      const preco = arrayElement[1];
      const li = document.createElement('li');
      li.innerText = textoLi;
      li.addEventListener('click', () => {
        li.remove();
        addInLocalStorage();
        subtraiPreco(preco);
        attPreco();
      });
      ol.appendChild(li);
    });
  }
}

// Precisei assistir ao vídeodo Bê para começar a fazer.

const searchProducts = async (argumento) => {
  const searchData = await fetchProducts(argumento);
  const sectionItens = document.querySelector('.items');
  searchData.results.forEach((element) => {
    const itenObject = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
      preco: element.price,
    };
    const productItem = createProductItemElement(itenObject);
    sectionItens.appendChild(productItem);
  });
  return sectionItens;
};

window.onload = async () => {
  searchProducts('computador');
  clearCart();
  getElementReload();
  valorCarrinho();
};

// Não Utilizados:

// function cartItemClickListener(event) {
//   const bye = event.target;
//   return bye.remove;
// }

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }
