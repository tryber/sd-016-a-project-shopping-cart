const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    JSON: jest.fn(),
  },
});

Object.defineProperty(window, 'JSON', {
  value: {
    parse: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('1 - Testa se, ao executar `getSavedCartItems`, o método `localStorage.getItem` é chamado.', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });

  it('2 - Teste se, ao executar `getSavedCartItems`, o método `localStorage.getItem` é chamado com o \'cartItems\' como parâmetro.', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
});
