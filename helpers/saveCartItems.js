const saveCartItems = (allItems) => {
  // seu código aqui
  localStorage.setItem('cartItems', allItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}

// ============================================================ //
// ============= ACKNOWLEDGEMENTS & REFERENCES ================ //
// ============================================================ //

// localStorage usage, done with help of Ricardo Carvalho
// Great acknowledgement to Ju Barcelos and O Gui Augusto for helping with the logic to use the whole html content to save at localStorage. 
