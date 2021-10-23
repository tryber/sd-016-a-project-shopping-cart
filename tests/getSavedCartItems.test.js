const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('Testa se localStorage.getItem é chamado', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('Testa o parâmetro chamados pelo método localStorage.getItem', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
