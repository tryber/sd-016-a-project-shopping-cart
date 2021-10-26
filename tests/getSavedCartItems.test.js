const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {

  it('O método localStorage.getItem deve ser chamado ao executar a função!', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('Ao executar a função, localStorage.getItem deve conter o parâmetro correto!', () => {
    expect(getSavedCartItems())
    .toEqual(localStorage.getItem('cartItems'));
  });

});
