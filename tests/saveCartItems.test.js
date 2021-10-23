const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('1 - Teste a função saveCartItems', () => {
  it('testa se a função ao ser executada com o argumento "<ol><li>Item</li></ol>", o método localStorage.setItem é chamado;' , () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('testa se a função ao ser executada com o argumento "<ol><li>Item</li></ol>", o método localStorage.setItem é chamado com dois parâmetros;' , () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
});

});