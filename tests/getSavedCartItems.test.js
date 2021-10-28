const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {

  getSavedCartItems();
  it('Verifica se ao executar getSavedCartItems, localStorage.getItem é chamado', () => {
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('Verifica se ao executar getSavedCartItems, localStorage.getItem é chamado com o parâmetro cartItems', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });

});
