const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
    clear: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('1 - Testa se ao chamar a função saveCartItems com o argumento `<ol><li>Item</li></ol>`, o método localStorage.setItem é chamado.', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Testa se, ao executar `saveCartItems` com o argumento `<ol><li>Item</li></ol>`, o método `localStorage.setItem` é chamado com dois parâmetros, sendo o primeiro \'cartItems\' e o segundo sendo o valor passado como argumento para `saveCartItems`.', () => {
    const arg = '<ol><li>Item</li></ol>'
    saveCartItems(arg);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify(arg));
  });
});
