const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('3 - Teste a função getSavedCartItems', () => {
  it('Ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })

  it('Ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro', () => {
    const expected = 'cartItems';
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith(expected);
  })
});
