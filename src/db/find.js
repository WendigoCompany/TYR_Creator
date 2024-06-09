module.exports = (arr, value, key) => {
  let found;
  if (key !== undefined) {
    found = arr.filter((v) => v[key] == value);
  } else {
    found = arr.filter((v) => v == value);
  }

  return found.length == 0 ? false : found;
};
