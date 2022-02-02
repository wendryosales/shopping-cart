require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })

  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    expect.assertions(1);
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  })

  it('ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    expect.assertions(1);
    const validUrl = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(validUrl);
  })

  it('o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect.assertions(1);
    const actual = await fetchProducts('computador');
    expect(actual).toEqual(computadorSearch);
  })

  it('ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try {
      await fetchProducts()
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  })
});
