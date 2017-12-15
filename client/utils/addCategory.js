const addCategory = (category, array) => {
  if (array.indexOf(category) > -1) {
    return array.filter(item => item !== category);
  }
  return [...array, category];
};
export default addCategory;
