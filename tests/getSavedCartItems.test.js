const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado.', (done) => {
    try {
      getSavedCartItems();
      expect(localStorage.getItem).toHaveBeenCalled();
      done();
    } catch (err) {
      done(err);
    };
  });

  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro.', (done) => {
    try {
      getSavedCartItems();
      expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
      done();
    } catch (err) {
      done(err);
    };
  })
});
