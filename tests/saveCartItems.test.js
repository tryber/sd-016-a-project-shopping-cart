const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

// Teste se, ao executar saveCartItems com o argumento item, o método localStorage.setItem é chamado;

// Teste se, ao executar saveCartItems com o argumento item, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro 'cartItems' e o segundo sendo o valor passado como argumento para saveCartItems.

describe('4 - Teste a função saveCartItems', () => {
  it('ao executar saveCartItems com o argumento Item, o método localStorage.setItem é chamado', () => {
    saveCartItems('item');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('ao executar saveCartItems com o argumento Item, o método localStorage.setItem é chamado com dois parâmetros, cartItems e o valor passado como argumento para a função', () => {
    saveCartItems('item');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'item');
  });
});
