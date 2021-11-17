const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('Testa se o método localStorage.setItem é chamado se passado à função um argumento', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');

    expect(window.localStorage.setItem).toHaveBeenCalled();
  });
  it('Testa se o método localStorage.setItem é chamado com os parâmetros esperados', () => {
    expect.assertions(1);
    const value = '<ol><li>Item</li></ol>';
    saveCartItems(value);

    expect(window.localStorage.setItem).toHaveBeenCalledWith('cartItems', value);
  });
});
