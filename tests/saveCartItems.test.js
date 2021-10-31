const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('Ao executá-la com o argumento <ol><li>Item</li></ol>, verifica se localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Ao executá-la com o argumento <ol><li>Item</li></ol>, verifica se localStore.setItem é retornada com os parâmetros cartItems e o argumento fornecido', () => {
  saveCartItems('<ol><li>Item</li></ol>');
  expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
