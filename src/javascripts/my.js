export default () => {
  const obj = { a: 1, b: 2 };
  const newObj = { ...obj, c: 3, d: 4 };
  console.log("This is my module.", newObj);
};
