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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const sectionCart = document.querySelector('.cart__item');
  sectionCart.removeChild(event.target);
  saveCartItems(sectionCart.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  console.log(searchData);
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

  async function addItem(id) {
      const searchItem = await fetchItem(id);
      console.log(searchItem);
      const itemObject = {
          sku: searchItem.id,
          name: searchItem.title,
          salePrice: searchItem.price,
        };
        const sectionCart = document.querySelector('.cart__item');
        sectionCart.appendChild(createCartItemElement(searchItem));
      }

      function clearCart() {
        const clearList = document.querySelector('.empty-cart');
        clearList.addEventListener('click', () => {
          sectionCart.innerHTML = '';
          localStorage.removeItem('cartItems');
        });
      }

window.onload = () => {
  searchProducts('computador');
  addItem('MLB1615760527');
  clearCart();
 };
