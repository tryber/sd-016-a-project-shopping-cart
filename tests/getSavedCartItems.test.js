const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('Teste se, ao executar getSavedCartItems , o método localStorage.setItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('Ao chamar getSavedCartItems , localStorage é chamado com argumento "cartItems"', () => {
    getSavedCartItems();
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems');
  })
});
