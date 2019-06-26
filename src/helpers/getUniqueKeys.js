const getUniqueKeys = (itemsList, key) => {
  const typeList = [];
  itemsList.forEach(item => {
    if (!typeList.includes(item[key])) typeList.push(item[key]);
  });
  typeList.sort();
  return typeList;
};

export default getUniqueKeys;
