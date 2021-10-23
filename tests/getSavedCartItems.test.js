const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
    test('Se, ao executar saveCartItems() o metodo localStorage.setItem é chamado!', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  }); 

  test('Se, ao executar getSavedCartItems() o metodo localStorage.setItem é chamado com cartItems como parâmetros!', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  }); 

});
