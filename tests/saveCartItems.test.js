const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('O método localStorage.getItem deve ser chamado ao executar a função!', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('Ao executar a função, localStorage.getItem deve conter o parâmetro correto!', () => {
    expect(getSavedCartItems())
    .toEqual(localStorage.getItem('cartItems'));
  });
});
