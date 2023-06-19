const zero = '+[]'
const one = '+!![]'

const number = n => n === 0 ? zero : Array.from({ length: n }, () => one).join(' + ')

// Dont work properly
const fromString = s => s.split('').map(x => x in map ? map[x] : `([]+[])[${fromString('constructor')}][${fromString('fromCharCode')}](${number(x.charCodeAt(0))})`).join('+')

const compile = code => `(()=>{})[${fromString('constructor')}](${fromString(code)})()`

const map = {}

// NaN
map.a = `(+{}+[])[${number(1)}]`

// [object] [Object]
map.o = `({}+[])[${number(1)}]`
map.b = `({}+[])[${number(2)}]`
map.j = `({}+[])[${number(3)}]`
map.e = `({}+[])[${number(4)}]`
map.c = `({}+[])[${number(5)}]`
map.t = `({}+[])[${number(6)}]`
map[' '] = `({}+[])[${number(7)}]`

// Infinity
map.I = `((+!![]/+[])+[])[${number(0)}]`
map.n = `((+!![]/+[])+[])[${number(1)}]`
map.f = `((+!![]/+[])+[])[${number(2)}]`
map.i = `((+!![]/+[])+[])[${number(3)}]`
map.y = `((+!![]/+[])+[])[${number(7)}]`

// false
map.l = `(![]+[])[${number(2)}]`
map.s = `(![]+[])[${number(3)}]`

// true
map.r = `(!![]+[])[${number(1)}]`
map.u = `(!![]+[])[${number(2)}]`

// function String { [native code] }
map.S = `([]+([]+[])[${fromString('constructor')}])[${number(9)}]`
map.g = `([]+([]+[])[${fromString('constructor')}])[${number(14)}]`

// function RegExp { [native code] }
map.p = `([]+(/-/)[${fromString('constructor')}])[${number(14)}]`

// /\\\\/
map['\\'] = `(/\\\\/+[])[${number(1)}]`

// (13).toString(14) === 'd'
map.d = `(${number(13)})[${fromString('toString')}](${number(14)})`

// (17).toString(18) === 'h'
map.h = `(${number(17)})[${fromString('toString')}](${number(18)})`

// (22).toString(23) === 'm'
map.m = `(${number(22)})[${fromString('toString')}](${number(23)})`

// '%5C'
map.C = `(()=>{})[${fromString('constructor')}](${fromString('return escape')})()(${map['\\']})`

console.log(compile('console.log("Hello world")'))
