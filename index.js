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
map.O = `({}+[])[${number(8)}]`
map[' '] = `({}+[])[${number(7)}]`
map['['] = `({}+[])[${number(0)}]`
map[']'] = `({}+[])[${number(14)}]`

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

// ([]+([])['constructor']) -> function Array() { [native code] }
map.A = `([]+([])[${fromString('constructor')}])[${number(9)}]`

// ([]+(![])['constructor']) -> function Boolean() { [native code] }
map.B = `([]+(![])[${fromString('constructor')}])[${number(9)}]`

// ((()=>{})['constructor']) => 'function Function() { [native code] }'
map.F = `((()=>{})[${fromString('constructor')}]+[])[${number(9)}]`

// ([]+(/-/)['constructor']) -> function RegExp { [native code] }
map.p = `([]+(/-/)[${fromString('constructor')}])[${number(14)}]`

// Regex
map['\\'] = `(/\\\\/+[])[${number(1)}]`
map['/'] = `(/-/+[])[${number(0)}]`
map['-'] = `(/-/+[])[${number(1)}]`
map['+'] = `(/-+/+[])[${number(2)}]`
map['>'] = `(/>/+[])[${number(1)}]`
map['!'] = `(/!/+[])[${number(1)}]`
map['='] = `(/=/+[])[${number(1)}]`
map['('] = `(/()/+[])[${number(1)}]`
map[')'] = `(/()/+[])[${number(2)}]`
map['{'] = `(/{/+[])[${number(1)}]`
map['}'] = `(/}/+[])[${number(1)}]`
map[']'] = `(/]/+[])[${number(1)}]`

// (x)['toString'](x + 1) -> letter
map.h = `(${number(17)})[${fromString('toString')}](${number(18)})`
map.k = `(${number(20)})[${fromString('toString')}](${number(21)})`
map.q = `(${number(26)})[${fromString('toString')}](${number(27)})`
map.v = `(${number(31)})[${fromString('toString')}](${number(32)})`
map.w = `(${number(32)})[${fromString('toString')}](${number(33)})`
map.x = `(${number(33)})[${fromString('toString')}](${number(34)})`
map.z = `(${number(35)})[${fromString('toString')}](${number(36)})`

// (()=>{})['constructor']('return escape')()('\\') -> %5C
map['%'] = `(()=>{})[${fromString('constructor')}](${fromString('return escape')})()(${map['\\']})[${number(0)}]`
map.C = `(()=>{})[${fromString('constructor')}](${fromString('return escape')})()(${map['\\']})[${number(2)}]`
map.E = `(()=>{})[${fromString('constructor')}](${fromString('return escape')})()(${map['>']})[${number(2)}]`
map.D = `(()=>{})[${fromString('constructor')}](${fromString('return escape')})()(${map['}']})[${number(2)}]`

console.log(compile('console.log("Hello world")'))
