const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
getSavedCartItems();
it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado;', ()  => {
  expect(localStorage.getItem).toHaveBeenCalled();
});

console.log(localStorage)

it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o cartItems como parâmetro.', ()=> {
  expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
})

});
