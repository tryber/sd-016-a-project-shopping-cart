const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  
  it('O método localStorage.setItem deve ser chamado ao executar a função!', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Com o parâmetro testado, localStorage.setItem deve ser chamado corretamente!', () => {
    expect(saveCartItems('<ol><li>Item</li></ol>'))
    .toEqual(localStorage.setItem('cartItems', '<ol><li>Item</li></ol>'));
  });

});
