export const compareArrays = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  const newArray = (obj) => {
    JSON.stringify(
      Object.keys(obj)
        .sort()
        .map((key) => [key, obj[key]])
    );
  };
  arr1 = new Set(arr1.map(newArray));
  return arr2.every((obj) => arr1.has(newArray(obj)));
};
