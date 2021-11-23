const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('Testa se a função saveCartItems com o argumento <ol><li>Item</li></ol>  método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();
  });
  it('Testa se o método localStorage.setItem é chamado com os argumentos corretos', () => {
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItem', '<ol><li>Item</li></ol>');
  });
});
