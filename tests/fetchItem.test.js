const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {

  it('Testa se é uma função', () => {

    expect(typeof fetchItem).toBe('function');
  })

  it('Executa a função com o id "MLB1615760527" e testa se fetch foi chamada', () => {

    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('Testa se o endpoint de fetch é o esperado com argumento "MLB1615760527"', () => {

    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  });

  // falso positivo
  it('Testa se o retorno de fetchItem com o argumento "MLB1615760527" é o esperado', () => {

    fetchItem("MLB1615760527")
      .then((res) => expect(res).toEqual(3));
  })

  it('Testa se, ao não passar argumentos lança uma exceção', async () => {

    // trecho de código retirado do colega Adran Carnavale
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    };

  })
});
