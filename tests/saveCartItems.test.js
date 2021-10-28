const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('verifica se ao chama saveCartItems com parâmetro -<ol><li>Item</li></ol>- localStorage.setItem é chamado', ()  => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
 
 it('verifica se ao chama saveCartItems com parâmetro -<ol><li>Item</li></ol>- localStorage.setItem é chamado com 2 parâmetros -cartItems- e o segundo com valor igual ao parâmetro inserido', () => {
   saveCartItems('<ol><li>Item</li></ol>');
   expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
 });
});
