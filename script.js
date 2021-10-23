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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// Remova o item do carrinho de compras ao clicar nele

const father = document.querySelector('.cart__items');

function cartItemClickListener(event) {
  father.removeChild(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addToCart = async (id) => {
  const cartItems = document.querySelector('.cart__items');
  const item = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = item;
  cartItems.appendChild(createCartItemElement({ sku, name, salePrice }));
};

function createProductItemElement({ sku, name, image }) { // { id, title, thumbnail }
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', () => addToCart(sku));

  return section;
}

/*
  A partir dos dados obtidos pela função fetchItem você deve utilizar a função createCartItemElement() para criar os componentes HTML referentes a um item do carrinho.

1- Como vou disparar um evento?
  qual momento eu posso inserir? -> quando criamos o elemento - createProductItemElement

2- Como vou recuperar as informações de onde eu cliquei? event

3- Recuperar o id de onde eu cliquei

4- Chamar o fetchItem() com o id recuperado de onde eu cliquei

5- Extrair as informações necessárias do retorno da fetchItem

6- Adicionar no carrinho de comprar. Como fazer?

- Qual elemento html (DOM) que eu devo recuperar para inserir as informações
- Fazer a incluisão de elemento HTML criado pela função no carrinho de comprar

7- Fazer testes
*/

async function searchProduct(product) { // requisito feito graças ao Bê que nos ajudou com um video passo a passo
  const data = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  data.results.forEach((element) => {
    const obj = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    const productItem = createProductItemElement(obj); // a função é chamada para cada um dos element que vierem no array results
    sectionItems.appendChild(productItem);
  });
}

const cart = () => {
  father.innerHTML = getSavedCartItems();
};

window.onload = () => {
  searchProduct('computador');
  cart();
};
