const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado.', (done) => {
    try {
      saveCartItems('<ol><li>Item</li></ol>');
      expect(localStorage.setItem).toHaveBeenCalled();
      done();
    } catch (err) {
      done(err);
    }
  });

  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems.', (done) => {
    try {
      const value = '<ol><li>Item</li></ol>';
      saveCartItems(value);
      expect(localStorage.setItem).toHaveBeenCalledWith('cartItems',value);
      done()
    } catch (err) {
      done(err)
    }
  });
});
