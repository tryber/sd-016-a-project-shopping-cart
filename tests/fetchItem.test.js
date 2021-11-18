const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('must be a function' , () => {
    expect (typeof fetchItem).toBe('funtion');
  });
   it('ao chamá-la com o argumento computador, testa se fetch foi chamada', () => {
     fetchItem('MLB1615760527');
     expect(fetch).toHaveBeenCalled();
   });
   it('teste se com argumento computador, se fetch usou o endpoint correto', () => {
     const endpoint ='https://api.mercadolibre.com/sites/MLB/search?q=${product}'
     fetchItem('MLB1615760527')
     expect(fetch).toHaveBeenCalledWith(endpoint)
   })
   it ('testa se o retorno da função é um objeto igual a item' , async () => {
     const results = await fetchProducts('MLB1615760527')
     expect(results).toEqual(item)
   });
   it ('testa se sem nenhum argumento retorna erro' , async () => {
     const expectedError = new Error ('You must provide an url')
     const result = await fetchItem ();
     expect(result).toEqual(expectedError) 
 
   })
 });

