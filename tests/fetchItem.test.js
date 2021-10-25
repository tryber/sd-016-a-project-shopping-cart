const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Teste se fecthItem retorna uma funcao', () => {
    expect(typeof fetchItem).toBe('function')
  });
  it('Execute a função fecthItem com o argumento "MLB1615760527" e teste se fetch foi chamada', () => {
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
  });
  it('Teste se, ao chamar a função fetchItems com o argumento "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    fetchItem('MLB1615760527')
    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527"
    expect(fetch).toHaveBeenCalledWith(endpoint)
  });
  it('Teste se o retorno da função fetchItems com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const result = await fetchItem('MLB1615760527')
    expect(result).toEqual(item)
  });
  it('Teste se, ao chamar a função fetchItems sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const result = await fetchItem()
    const erro = new Error('You must provide an url')
    expect(result).toEqual(erro)
  });
});
