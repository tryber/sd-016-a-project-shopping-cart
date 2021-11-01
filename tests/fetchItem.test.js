const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');

  it('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Execute fetchItem com o argumento "MLB1615760527" e teste se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Execute fetchItem com o argumento "MLB1615760527" e teste se fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('Teste se o retorno de fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    expect(await fetchItem('MLB1615760527')).toBe(item);
  });

  it('Teste se fetchItem sem argumento retorna um erro com a mensagem: You must provide an url', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});
