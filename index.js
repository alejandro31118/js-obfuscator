const zero = '+[]'
const one = '+!![]'
const map = {}

const number = n => n === 0 ? zero : Array.from({ length: n }, () => one).join(' + ')

const fromString = s => s.split('').map(x => x in map ? map[x] : `([]+[])[${fromString('constructor')}][${fromString('fromCharCode')}](${number(x.charCodeAt(0))})`).join('+')

const compile = code => `(()=>{})[${fromString('constructor')}](${fromString(code)})()`

map['0'] = `(${number(0)}+[])`
map['1'] = `(${number(1)}+[])`
map['2'] = `(${number(2)}+[])`
map['3'] = `(${number(3)}+[])`
map['4'] = `(${number(4)}+[])`
map['5'] = `(${number(5)}+[])`
map['6'] = `(${number(6)}+[])`
map['7'] = `(${number(7)}+[])`
map['8'] = `(${number(8)}+[])`
map['9'] = `(${number(9)}+[])`

// (+{}+[]) -> NaN
map.N = `(+{}+[])[${number(0)}]`
map.a = `(+{}+[])[${number(1)}]`

// ({}+[]) -> [object Object]
map.o = `({}+[])[${number(1)}]`
map.b = `({}+[])[${number(2)}]`
map.j = `({}+[])[${number(3)}]`
map.c = `({}+[])[${number(5)}]`
map[' '] = `({}+[])[${number(7)}]`
map['['] = `({}+[])[${number(0)}]`

// ((1/0)+[]) -> Infinity
map.I = `((+!![]/+[])+[])[${number(0)}]`
map.n = `((+!![]/+[])+[])[${number(1)}]`
map.i = `((+!![]/+[])+[])[${number(3)}]`
map.y = `((+!![]/+[])+[])[${number(7)}]`

// (![]+[]) -> false
map.f = `(![]+[])[${number(0)}]`
map.l = `(![]+[])[${number(2)}]`
map.s = `(![]+[])[${number(3)}]`

// (!![]+[]) -> true
map.t = `(!![]+[])[${number(0)}]`
map.r = `(!![]+[])[${number(1)}]`
map.u = `(!![]+[])[${number(2)}]`
map.e = `(!![]+[])[${number(3)}]`

// ([]+((1)['['])) -> undefined
map.d = `([]+((${one})[${fromString('[')}]))[${number(2)}]`

// ([]+([]+[])['constructor']) -> function String { [native code] }
map.S = `([]+([]+[])[${fromString('constructor')}])[${number(9)}]`
map.g = `([]+([]+[])[${fromString('constructor')}])[${number(14)}]`

// ([]+(+[])['constructor']) -> function Number() { [native code] }
map.m = `([]+(+[])[${fromString('constructor')}])[${number(11)}]`

// ([]+(/-/)['constructor']) -> function RegExp { [native code] }
map.p = `([]+(/-/)[${fromString('constructor')}])[${number(14)}]`

// (/\\\\/+[]) -> /\\\\/
map['\\'] = `(/\\\\/+[])[${number(1)}]`

// (17)['toString'](18) -> h
map.h = `(${number(17)})[${fromString('toString')}](${number(18)})`

// (()=>{})['constructor']('return escape')()('\\') -> %5C
map['%'] = `(()=>{})[${fromString('constructor')}](${fromString('return escape')})()(${map['\\']})[${number(0)}]`
map.C = `(()=>{})[${fromString('constructor')}](${fromString('return escape')})()(${map['\\']})[${number(2)}]`

console.log(compile('console.log("Hello world")'))
