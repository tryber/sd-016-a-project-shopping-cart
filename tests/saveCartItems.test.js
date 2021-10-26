const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  saveCartItems('<ol><li>Item</li></ol>');

  it ('A chamada de saveCartItems("<ol><li>Item</li></ol>" retorna o localStorage) ', () => {
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it ('A chamada de saveCartItems("<ol><li>Item</li></ol>" retorna o localStorage) ', () => {
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  }); 
});
