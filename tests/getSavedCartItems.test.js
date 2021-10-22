const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('getSavedCartItems é uma função', () => {
    expect.assertions(1);
    expect(typeof getSavedCartItems === 'function').toBeTruthy();
  });

  it('localStorage.setItem foi chamado', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('localStorage.setItem foi chamado com \'cartItems\' como parametro', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
