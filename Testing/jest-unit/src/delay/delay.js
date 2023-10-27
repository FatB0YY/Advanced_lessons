const delay = (callback, ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(callback());
    }, ms);
  });
};

module.exports = delay;
