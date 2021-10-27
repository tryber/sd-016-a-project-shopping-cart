const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado;
  it('testa se saveCartItems com o argumento <ol><li>Item</li></ol> chama localStorage', () => {
    const test = document.createElement('div');
    test.innerHTML = '<ol><li>Item</li></ol>';
    saveCartItems(test.firstChild);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  // Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro 'cartItems' e o segundo sendo o valor passado como argumento para saveCartItems.
  it('testa se ao execitar saveCartItems com o argumento <ol><li>Item</li></ol> localStorage.setItem e chamado com dois parametros', () => {
    const test = document.createElement('div');
    test.innerHTML = '<ol><li>Item</li></ol>';
    saveCartItems(test.firstChild);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', test.firstChild.innerHTML);
  });
});
