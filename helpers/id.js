// sourse of code: UofU bootcamp, module# 11, activities ## 17
// a function that generates a string of random numbers and letters
module.exports = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  