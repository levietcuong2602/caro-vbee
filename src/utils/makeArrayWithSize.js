export const makeArrayWithSize = size => {
  const rowsWidth = [];
  for (let i = 0; i < size; i++) {
    rowsWidth.push(null);
  }
  return rowsWidth;
};
