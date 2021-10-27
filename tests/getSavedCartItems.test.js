const getSavedCartItems = require('../helpers/getSavedCartItems');
const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('ao executa-la, o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('Teste se, ao executa-la, o método localStorage.getItem é chamado com o cartItems como parâmetro', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  });
});
