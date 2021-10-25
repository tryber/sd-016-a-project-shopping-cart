const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {

  test('1- check if fetchProducts is a function', async () => {
    expect(typeof (fetchProducts)).toBe('function');
  });

  test('2- check if it have a call for fetch on fetchProducts with "computador" argument ', async () => {

    const response = await fetchProducts('computador');

    expect(typeof (fetchProducts(response))).toBe('object');

  });

  test('3 -check if fetchProducts with "computador" argument  return the endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {

    const response = await fetchProducts('computador');
    const { query } = response;

    expect(query).toBe('computador');
  });

  test('4- check if fetchProducts function with "computador" argument returns as same as object computdaorSearch', async () => {

    const response = await fetchProducts('computador');
    expect(response).toBe(computadorSearch);

  });

  test('5- check if fetchProducts function with no argument returns the error "You must provide an url" ', async () => {

    try {
      await fetchProducts();
    } catch (error){
    expect(error).toEqual(new Error('You must provide an url'));
  }
  });

});

//test 5 utilizado da ideia do Ádran Carnavale no slack abaixo:
//https://trybecourse.slack.com/archives/C02A8CKT31U/p1634767241335300