const zero = '+[]'
const one = '+!![]'
const map = {}

const number = n => n === 0 ? zero : Array.from({ length: n }, () => one).join(' + ')

// Dont work properly
const fromString = s => s.split('').map(x => x in map ? map[x] : `([]+[])[${fromString('constructor')}][${fromString('fromCharCode')}](${number(x.charCodeAt(0))})`).join('+')

const compile = code => `(()=>{})[${fromString('constructor')}](${fromString(code)})()`

// NaN
map.N = `(+{}+[])[${number(0)}]`
map.a = `(+{}+[])[${number(1)}]`

// [object] [Object]
map.o = `({}+[])[${number(1)}]`
map.b = `({}+[])[${number(2)}]`
map.j = `({}+[])[${number(3)}]`
map.c = `({}+[])[${number(5)}]`
map[' '] = `({}+[])[${number(7)}]`
map['['] = `({}+[])[${number(8)}]`

// Infinity
map.I = `((+!![]/+[])+[])[${number(0)}]`
map.n = `((+!![]/+[])+[])[${number(1)}]`
map.i = `((+!![]/+[])+[])[${number(3)}]`
map.y = `((+!![]/+[])+[])[${number(7)}]`

// false
map.f = `(![]+[])[${number(0)}]`
map.l = `(![]+[])[${number(2)}]`
map.s = `(![]+[])[${number(3)}]`

// true
map.t = `(!![]+[])[${number(0)}]`
map.r = `(!![]+[])[${number(1)}]`
map.u = `(!![]+[])[${number(2)}]`
map.e = `(!![]+[])[${number(3)}]`

// undefined
map.d = `([]+((${one})[${fromString('[')}]))[${number(2)}]`

// function String { [native code] }
map.S = `([]+([]+[])[${fromString('constructor')}])[${number(9)}]`
map.g = `([]+([]+[])[${fromString('constructor')}])[${number(14)}]`

// function Number() { [native code] }
map.m = `([]+(+[])[${fromString('constructor')}])[${number(11)}]`

// function RegExp { [native code] }
map.p = `([]+(/-/)[${fromString('constructor')}])[${number(14)}]`

// /\\\\/
map['\\'] = `(/\\\\/+[])[${number(1)}]`

// (17).toString(18) === 'h'
map.h = `(${number(17)})[${fromString('toString')}](${number(18)})`

// '%5C'
map.C = `(()=>{})[${fromString('constructor')}](${fromString('return escape')})()(${map['\\']})`

console.log(compile('console.log("Hello world")'))
