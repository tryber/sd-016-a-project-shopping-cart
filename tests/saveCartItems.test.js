const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('se saveCartItems é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  

  fail('Teste vazio');
});
