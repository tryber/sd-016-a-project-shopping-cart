const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('Testa se ao executar a função, o método localStorage.getItem é chamado', () => {
    expect.assertions(1);
    getSavedCartItems();

    expect(window.localStorage.getItem).toHaveBeenCalled();
  });
  it('Testa se ao executar a função, o método localStorage.getItem é chamado com o parâmetro `cartItems`', () => {
    expect.assertions(1);
    getSavedCartItems();

    expect(window.localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
