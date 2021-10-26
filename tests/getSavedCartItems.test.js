const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('verifica se é uma função', () => {
    expect(typeof getSavedCartItems).toBe('function');
  })
  
  it('verifica se ao executá-lá é chamado o localStorage.getItem', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  
  it('verifica se após executá-lo, é chamado com cartItems ', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
 