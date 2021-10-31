const saveCartItems = (id, sku, name, price) => {
  const obj = { id, sku, name, price };
  const rr = localStorage.getItem('cartItems');
  if (rr === null) {
    localStorage.setItem('cartItems', JSON.stringify([obj]));
  } else {    
  const iii = JSON.parse(rr);
  const indexEl = iii.indexOf(iii.filter((elee) => elee.id === id)[0]);
  if (indexEl !== -1) {
   iii.splice(indexEl, 1);
   localStorage.setItem('cartItems', JSON.stringify(iii)); 
  } else {
   iii.push(obj);
   localStorage.setItem('cartItems', JSON.stringify(iii)); 
  }
  }
     console.log(localStorage.getItem('cartItems').length);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
