const removeMask = (value, toInt = false) => {
  const valueWithoutMask = `${value}`.replace(/[^\d]+/g, '');
  if (!toInt) {
    return valueWithoutMask;
  }
  return parseInt(valueWithoutMask, 10);
};

export default removeMask;
