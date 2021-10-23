const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('testa se a função ao ser executada com o argumento "<ol><li>Item</li></ol>", o método localStorage.setItem é chamado;' , () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('testa se a função ao ser executada com o argumento "<ol><li>Item</li></ol>", o método localStorage.setItem é chamado com dois parâmetros;' , () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
});
});
