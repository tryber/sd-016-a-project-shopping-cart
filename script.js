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
  // coloque seu código aqui
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const ol = document.querySelector('.cart__items');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  ol.appendChild(li);
  // return li;
}

// Ajuda do Victor Faria - Turma 11/ Emerson Moreira e Julia Barcelos(Turma 16 - For(ever))
const addItemToShopCart = async (id) => {
  const listItems = await fetchItem(id);
  const { title, price } = listItems;
  createCartItemElement({
    id,
    title,
    price,
  });
  saveCartItems();
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const sectionFather = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const createButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  createButton.addEventListener('click', () => {
    addItemToShopCart(sku);
    saveCartItems();
  });
  section.appendChild(createButton);
  sectionFather.appendChild(section);
  // return section; -- o Bê mandou tirar
}

const listProducts = () => fetchProducts('computador').then((value) => {
  value.results.forEach((item) => {
    createProductItemElement(item);
  });
});

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const saveLocalStorage = () => {
  const ol = document.querySelector('.cart__items');
  ol.innerHTML = getSavedCartItems();
};

window.onload = () => { 
  listProducts();
  saveLocalStorage();
};
