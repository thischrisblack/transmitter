const getUniqueTypes = (messagesList, key) => {
  const typeList = [];
  messagesList.forEach(message => {
    if (!typeList.includes(message[key])) typeList.push(message[key]);
  });
  return typeList;
};

export default getUniqueTypes;
