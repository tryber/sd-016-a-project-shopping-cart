const CartList = document.querySelector('.cart__items');

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
/*   
  pq n funfa?
  const help = event.target.parentElement;
  const selectitem = event.target;
  help.removeChild(selectitem);
  saveCartItems(help.innerHTML); */
  event.target.remove();
  saveCartItems(CartList.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  const Additem = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  Additem.addEventListener('click', () =>
    fetchItem(sku).then((item) => {
      // const { title: name, price: salePrice } = item;
      CartList.appendChild(   
        createCartItemElement({
          sku: item.id, name: item.title, salePrice: item.price,
        }),
      );
      saveCartItems(CartList.innerHTML);
    }));
  section.appendChild(Additem);
  return section;
}

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

async function ProductData(product) {
  // logica com ajudinha do GRANDE BE
  const DataProducts = await fetchProducts(product);
  const items = document.querySelector('.items');
  DataProducts.results.forEach((element) => {
    const { id, title, thumbnail } = element;
    const ProductsObj = {
      sku: id,
      name: title,
      image: thumbnail,
    };
    const productItem = createProductItemElement(ProductsObj);
    items.appendChild(productItem);
  });
}

function reload() {
  CartList.innerHTML = getSavedCartItems();
  const CartList2 = document.querySelectorAll('.cart__items');
  for (let i = 0; i < CartList2.length; i += 1) {
    CartList2[i].addEventListener('click', cartItemClickListener);
  }
}

function Limpar() {
  localStorage.clear();
  CartList.innerHTML = '';
}

window.onload = () => { 
  const ButtonEsvaziar = document.querySelector('.empty-cart');
  ButtonEsvaziar.addEventListener('click', Limpar);
  ProductData('computador');
  reload();
};
