const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');

  it('Execute saveCartItems com o argumento "<ol><li>Item</li></ol>" e teste se o método localStorage.setItem é chamado', () => {
    const ol = document.createElement('ol');
    const li = document.createElement('li');
    ol.appendChild(li).innerHTML = 'Item';
    saveCartItems(ol.innerHTML);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Execute saveCartItems com o argumento "<ol><li>Item</li></ol>" e teste se o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    const ol = document.createElement('ol');
    const li = document.createElement('li');
    ol.appendChild(li).innerHTML = 'Item';
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
