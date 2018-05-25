// A module for the snake game
const adjust = n => f => xs => mapi(x => i => i == n ? f(x) : x)(xs);
const dropFirst = xs => xs.slice(1);
const dropLast = xs => xs.slice(0, xs.length -1);
const id = x => x;
const k = x => y => x;
const map = f => xs => xs.map(f);
const mapi = f => xs => xs.map((x, i) => f(x)(i));
// merge object 1 and object 2
const merge = o1 => o2 => Object.assign({}, o1, o2);
//modulous operation
const mod = x => y => ((y%x) + x) % x;
// add a key value pair to an object
const objOf = k => v => {var o ={}; o[k] = v; return o};
const pipe = (...fns) => x => [...fns].reduce((acc, f) => f(acc), x);
const prop = k => o => o[k];
const range = n => m => Array.apply(null, Array(m-n)).map((_,i) => n+i);
const rep = c => n => map(k(c))(range(0)(n));
// find a random number (location)
const rnd = min => max => Math.floor(Math.random() * max) + min;
const spec      = o => x => Object.keys(o)
  .map(k => objOf(k)(o[k](x)))
  .reduce((acc, o) => Object.assign(acc, o));

module.exports = { adjust, dropFirst, dropLast, id, k, map, merge, mod, objOf, pipe, prop, range, rep, rnd, spec }

