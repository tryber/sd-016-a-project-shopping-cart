const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {

  saveCartItems(`<ol><li>Item</li></ol>`);
  it('Verifica se ao executar a função com o argumento <ol><li>Item</li></ol>, localStorage.setItem é chamado', () => {
    expect(localStorage.setItem).toHaveBeenCalle();
  });

  it('Verifica se ao executar a função com o argumento `<ol><li>Item</li></ol>`, `localStorage.setItem` é chamado com dois parâmetros', () => {
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });

});
