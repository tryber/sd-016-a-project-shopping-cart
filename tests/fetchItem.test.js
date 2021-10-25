const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
    it(`Testa se fetchItem é uma função`, () =>{
    expect(typeof fetchItem).toBe('function')
  });
  it('Testa se fetch foi chamado', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled()
  });
  it('Testa se fetchItem é chamado com o endpoint correto', () => {
    const endpoint ='https://api.mercadolibre.com/items/MLB1615760527' 
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith(endpoint)
  });
  it('Testa se o retorno da funcão é igual a item', async () =>{
    const result = await fetchItem('MLB1615760527')
    expect(result).toEqual(item)
  });
  it('Testa se fetchItem retorna o erro esperado', async () =>{
    const expectedError = 'You must provide an url';
    await expect(fetchItem()).rejects.toThrow(expectedError);
  });
});
