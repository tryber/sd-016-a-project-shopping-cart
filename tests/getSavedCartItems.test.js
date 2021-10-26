const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

//referência matchers da documentação no README do projeto: https://jestjs.io/pt-BR/docs/expect#tohavebeencalled

describe('4 - Teste a função getSavedCartItems', () => {
  it('Se ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('Se ao executar getSavedCartItems, o método localStorage.getItem é chamado com "cartItems" como parâmetro', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
