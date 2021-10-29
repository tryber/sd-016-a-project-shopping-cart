const getSavedCartItems = (father, addEvent) => {
  // seu código aqui
  localStorage.getItem('cartItems');
  const a = JSON.parse(localStorage.getItem('cartItems'));
  if (a !== null && a !== undefined) {
    a.forEach((e) => {
      const li = document.createElement('li');
      // li.className = 'cart__item';
      li.innerText = e;
      li.addEventListener('click', addEvent);
      father.appendChild(li);
    });
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
