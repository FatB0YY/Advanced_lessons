log("1");

setTimeout(() => {
  log("setTimeout 1");

  Promise.resolve().then(() => {
    log("promise setTimeout");
  });

  queueMicrotask(() => {
    log("queueMicrotask setTimeout");
  });
}, 0);

setTimeout(() => {
  log("setTimeout 2");
}, 0);

queueMicrotask(() => {
  log("queueMicrotask 1");
});

Promise.resolve().then(() => {
  log("promise 1");
});

queueMicrotask(() => {
  log("queueMicrotask 2");
});

Promise.resolve().then(() => {
  log("promise 2");
});

log("4");

/* 
    1 
    4 
    queueMicrotask 1
    promise 1 
    queueMicrotask 2
    promise 2 
    setTimeout 1 
    promise setTimeout 
    queueMicrotask setTimeout
    setTimeout 2
*/
