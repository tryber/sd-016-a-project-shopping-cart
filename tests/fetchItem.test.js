const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('testa se é uma função', () => {
    expect(typeof fetchItem).tobe('function');
  })

  it('executa a função com o argumento "MLB1615760527" e testa se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('executa a função com o argumento "computador" e testa se fecht foi chama com o endpoint correto', () => {
    const endpointUrl = "https://api.mercadolibre.com/items/MLB1615760527"
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpointUrl);
  })

  it('testa se o retorno da função é um objeto igual a computadorSearch', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(computadorSearch);
  })

  it('deve retornar um erro',async () => {
    const expectError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectError);
  })
});

