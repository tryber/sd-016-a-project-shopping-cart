const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('Verifica se a função saveCartItems com o argumento <ol><li>Item</li></ol> é chamada', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();
  });
  it('Verifica se função saveCartItems é chamada com dois argumentos', () => {
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '\"<ol><li>Item</li></ol>\"');
  });
});
