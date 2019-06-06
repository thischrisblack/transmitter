const getUniqueTypes = messagesList => {
  const typeList = [];
  messagesList.forEach(message => {
    if (!typeList.includes(message.type)) typeList.push(message.type);
  });
  return typeList;
}

export default getUniqueTypes;