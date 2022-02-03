const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const api = await fetch(url);
  const data = api.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
