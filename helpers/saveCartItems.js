const saveCartItems = (li) => {
  // seu código aqui
  console.log(li);
  const jaTem = JSON.parse(localStorage.getItem('cartItems'));  
  if (jaTem) {
    jaTem.push(li.innerHTML);
    localStorage.setItem('cartItems', JSON.stringify(jaTem));
    console.log(JSON.stringify(jaTem));
  } else {
    const naoTem = [li.innerHTML];
    localStorage.setItem('cartItems', JSON.stringify(naoTem));
    console.log(JSON.stringify(naoTem));
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
