const getSavedCartItems = require('../helpers/getSavedCartItems');
const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

// Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado;

// Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o 'cartItems' como parâmetro.

describe('4 - Teste a função getSavedCartItems', () => {

});
