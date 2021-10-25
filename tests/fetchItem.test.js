const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('testa se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('testa se a função é chamada ao passar com o parametro  o id a seguir MLB1615760527', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  it('testa se ao chamar a função com o paramêtro MLB1615760527, se ela utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    expect(fetch).toHaveBeenCalledWith(endpoint); 
  })
  it('testa se o retorno da função com o parametro MLB1615760527 é uma estrutura de dados igual ao objeto importado no arquivo', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  })
  it('testa se ao chamar a função sem parâmetros, retorna um erro com a mensagem "You must provide an url"', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectedError);
  })
});
