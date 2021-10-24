const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
 
  test('se ao executar a função é chamado localStorage.getItem', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  test('se ao executar a função é chamado localStorage.getItem com o parametro "cartItems"', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
