const getUniqueTypes = (messagesList, key) => {
  const typeList = [];
  messagesList.forEach(message => {
    if (!typeList.includes(message[key])) typeList.push(message[key]);
  });
  typeList.push("calendar");
  typeList.sort();
  return typeList;
};

export default getUniqueTypes;
