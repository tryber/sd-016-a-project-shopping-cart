const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');

  it('Execute saveCartItems com o argumento <ol><li>Item</li></ol> e teste se o método localStorage.setItem é chamado', () => {
    const test = document.createElement('ol');
    const li = document.createElement('li');
    test.appendChild(li).innerHTML = 'Item';
    saveCartItems(test);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Execute saveCartItems com o argumento <ol><li>Item</li></ol> e teste se o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    const test = document.createElement('ol');
    const li = document.createElement('li');
    test.appendChild(li).innerHTML = 'Item';
    saveCartItems(test);
    const savedCart = [];
    test.childNodes.forEach((item) => {
      savedCart.push({ product: item.innerHTML });
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify(savedCart));
  });
});
