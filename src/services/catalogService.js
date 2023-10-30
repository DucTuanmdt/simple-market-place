import api from "./api";

const specialKeyList = [
  {
    name: "keyword",
    type: "string",
    key: "q",
  },
  {
    name: "sortBy",
    type: "string",
    key: "_sort",
  },
  {
    name: "order",
    type: "string",
    key: "_order",
  },
];

function formatQuery(query) {
  const queryData = { ...query };

  const formatedQuery = {
    _limit: 18,
  };

  // add special key
  specialKeyList.forEach(({ name, key, type }) => {
    if (typeof queryData[name] === type) {
      formatedQuery[key] = queryData[name];
      delete queryData[name];
    }
  });

  return { ...queryData, ...formatedQuery };
}

const catalogService = {
  searchCatalog: async (query) => {
    try {
      const queryData = formatQuery(query);
      const serializedQuery = new URLSearchParams(queryData).toString();
      const response = await api.get(`/drones?${serializedQuery}`);

      if (response) {
        // delay 600ms to mimic production
        return await new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: response });
          }, 600);
        });
      }
    } catch (error) {
      console.log("Can not get catalogs ", error.message);
      return { error: error.message };
    }
  },
};

export default catalogService;
