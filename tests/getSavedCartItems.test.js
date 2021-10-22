const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('Verifica se, ao executar a função getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it ('Verifica se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro.', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  })
});
