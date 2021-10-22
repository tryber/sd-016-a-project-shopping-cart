const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('executa a função e testa se localStorage.getItem foi chamada',() => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })

  it('executa a função e testa se localStorage.getItem foi chamada com o argumento "cartItems"', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
