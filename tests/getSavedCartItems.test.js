const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('se saveCartItems é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  

  fail('Teste vazio');
});
