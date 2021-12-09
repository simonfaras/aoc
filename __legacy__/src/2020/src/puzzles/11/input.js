const testRaw = "L.LL.LL.LL,LLLLLLL.LL,L.L.L..L..,LLLL.LL.LL,L.LL.LL.LL,L.LLLLL.LL,..L.L.....,LLLLLLLLLL,L.LLLLLL.L,L.LLLLL.LL"
const realRaw = "LLLLLLLLL.LLLLLLL.LLLLLLLLLL.LLLLL.LLLLLL.LLLLLLLL.L.LLLLLL..L.LLLLL.LLLLLLLLLL.LLLLLLLLLLL,LLLLLLLLL.LLLLLL..LLLLLLLLLL.LLLLL.LLLLLLLL.LLL.LL.LLLLLLLLLLLLLLLLL.LLLLLLLLLL.LLLLLLLLLLL,LLLLLLLLL.LLLLLLLLLLLL.LLLLL.LLLLLLLLL.LLLLLLL..LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLL.LLLLLLL,LLLLLLLLLLLLLLLLL.LLLL.LLLLL.LLLLL.LLLLLL.LLLL.LLL.LLLLLLLLL.LLLLLLL.LLLL.LLLLL.LLLLLLLLLLL,L.LLLLLLL.LLLLLLL.LLLL.LL.LLLLLLL..LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLL.LLLL.LLLLLLLLLLL,LLLLLLLLLLLLLLLLL.LLLL.LLLLL.LLLLL.LLLLLL.LLL.LLLL.LLLLLLLLL.LLLLLLLLLLL.L.L.LLLLLLLLLLLLLL,LLLL.LLLLLLLLLLLLLLLL.LL.LLLLLLLLL.LL..LL.LLLLLLLL..LLLLLL.L..LLL.LL.LLLLLLLLLL.LLLLLLLLLLL,LLLLLLL.LLLLLLLLL.LLLL.LLLLL..LLLL.LLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLL.LLLL.LLLLLLLLLLL,LLLLLLLLL.LLLLLLLL.LLL..LLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLL.LLLLLLLLLLL,.L.....L......L.L.L...L...LL..........L....L..LL.....L.L....L.....L......L.......L...L..L.L,LLLLLL.LL.LLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLL,LLLLLLLLL.LLLLLLLLLLLL.LLLLL.LLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLL.LLLLLLLLL.LLLLLLLLL.LLLLLL,LLLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLL.LLLLL.LLLLLLL.LLLLLL.LLLLLLLLLLL.LLLLLLLLLL.LLLLLLL.LLL,LLLLLLLLL.LLLLLLLLLLLL.LLLLL.LL.LL.LLLLLL.LLLLLLLLLLLL.L.LLL.L.LLLLLLLLLLL.LLLLLLLLLLLLLLLL,LLLLLLLLL.LLLLLLL.LLLL.LLLLL.LLLLL.LLLLLLLLLLL.LLL..LLLLLLLL.LLLLLLL.LLLLL.LLLLLLLLLLLLLLLL,LLLLLLLLL.LLLL.LLLLLLL.LLLLL.L.LLL.LLLLLL.LLLLLLLL.LLLLL.LLL.LLL.LLL.LLLLLLLLLL..LLL.LLLLLL,LLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL..LLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLL.LLLLLLLLLLL,..LLL.....L...L.L....L.L.L.L.LL...L.LL.L..LLL......L.....L.L...L..LL.LL...LL..L....L.......,LLLLLLLLL.LLLLLLL.LLLL.LLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLL.LLL..LLLLLLLLLL.,LLLLLLLLL.LLLL.LLLLLLL..LLLLLL.LLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLLL.LLLLLLLLLLLLLLLLLLL,LLLLLLLLL.LLLLLLLLLLLL.LLLLL.LLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL,LL.LLLLLL.LLLLLLL.LLLL.LLLLL.LLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLL.LL.LLLLL.L.LLLLLLLLLL.LLL,LLLLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLLLL.LLLLLLLLLLL,......L...LL.L.LL.....LL...L.L.L..L.........L..LLL.L..L.L.LLL..L..L...L...L..L....L.LL.L...,LLLLLLLLL.LLLLLLLLLLLL.LLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLLLL.LLLLLLLLLLL,LLLL.LLLLLLLLLLLL.LLLL.LLLLLLLLL.L.LLLLLL.LLLLLLLL.L.LLLLL.LLLLLLLLL.LLLLL.LLL..LLLLLLLLLLL,.LLLLLLLL.LLLLLLL.LL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL..LLLLLL.LLL.L.LLL..LLLL.LL.LLL,LLLLLLLL..LLLLLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLL..LLLLL.LLL.LLLLLLL.LLLLL.LLLLLLLLLLLLLLLL,LLL.LLLLL.LLLLLLLLLLLLLLLLLL.LLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLL.L.LLLLLLLLLLLL.L,LLLLLLLLL.LLLLLLL.L.LL.LLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLL..LLLLL.LLLL.LLLLLLLLLLL,LLLL.LLLL.L.LLLLL.LLLL.LLLLL.LLLLL.L.LLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLL.LLLLLLLLLLLLLLLL,LLLLLLLLL.LLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLL.LL.LLLLLLLLL.L.LLLLL.LLLLLL.LLLLLLLLLLLL.LL,.LLLLLLLL.L.LLLLL..LLL.LLLLL.LLLLL.LLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLL.LLLLLL.LLLLLLLLLLL,.LL...LL.L..LL.LL....L..LL....L..L..L......L.....LLL....L.LLL..L..LLLLL..L.......L.....L..L,LLLLLLLLL.LLLLLLL..LLL.LL.L.LLLLLL.LLLLLL.L.LLLLLLL.LL.LLLLLLLLLLLLL.LLLLL.LLLL.LLLLLLLLLLL,L..LLLLLLLLLLLLLL.LLLL.LLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLL.LLLL.LLLLLLLLLLL,LLLLLLLLL..LLLLLLLLLLL.LLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLL.LLLLLLLLLLL,LLLLLLLLL.LLLLLLLLLLLL.LLLLL.LLLLL.LLLLLL.LL.LLLL..LLLLLLLLL.LLLLLLL.LLLLL.LLLL.LLLLLL.LLLL,.LLLLLLLLLL.LLLLL.LLLL.LLLLL.LLLLL.LLLLLL.LLLLLLLL.LLLLL.LLL.LLLLLLLLLLLLL.LLLLLLLL..LLLLLL,LLLLLLLLLLLLLLLLL.LL.LLLLLLL.LLLLL.LLLLL..LLLLLLLLLLLLLL.LLL.LLLLLLL.LLLLL.LLLL.LLLLLLLLLLL,.....LL...L..L.LL........L.......L.LLLLL..L.LLL...L..L....L.L..L.....L.L.........L..L.L...L,LLLLLLLLLLLLLLLLL.LLLL.LL.LL.LLLLL.LLLL.L.LLLLLLLL.LLLLLLL.L.LLLLLLL.LLLLL.LLLL.LLLLLLLLLLL,LLLLLLLLL.LLLLLLLLLLLL.LLLLL.LL.LLLLLLLLLLLLLLLLLL.LLL.LLLLL.LLLLLLL.LLLLL.LLLL.LLLLLLLLLLL,LLLLLLLLL.LLLLLLLLLLLL.LL.LL.LLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.L.LLLLL.LLLLLLLLLLLLLLLLLLLLLL,LLLLLLLLLLL.LLLLL.LLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLL.LL.LLLLL.L.LLLLL.LLLLLLLLLLL.LLLL,LLLLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLLL.LLLLLLLLL.LLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL.L.LLLLLLLLLLL,LLLLLLLLL.LLLLLLL.LLLL..LLLL.LLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LLLL.LLLLLLLLL.L,LLLL.LLLL.LL.LLLL.LLLL.LLLLL.LLLLL.LLLLLLLLLLLL.LL.LLLLLLLLL.LLLLLLL.LL.LLLLLL.LLLLLLLLLLLL,LLLLLLLLL.LLL.LLL.LLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLL.LLL.L.LLLLLLLLLL.LLLLLLLLLLL,L.L.L.L..LLLL.....LL.LL...L......LL..LLL.L.L.LL.LL....L.L....L..LL.L.......LLLLLLL.L....LL.,LLLLLLLLL.LLLLLLLL.LLL.LLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLL.LLLLLLLLLLL,LLLLLLLLLLLLLLLLL.LLLL.LLLLL.LLLLL.LL.LLL.LLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL,L.LLLLLLLLLLLLLLL..LLLL.LLLLLLL..L.LLLLLL.LLL.LLLL.LLLLLLLLL.LLLLLLL.LLLLL.LLLL.LLLLLLLLLLL,LLLLLLLLL.LLLLLLLLLLLL.LLLLL.LLLLL.LLLLLL.LLLLLLLL.LLL.LLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL,LLLLLLLLL.L.LLLLL.LLLL.LLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL,LLLLLLLLLLLLLLLLL.LLLL.LLLLL.LL.LL.LLLLLLLLLLLLLLL.LLL.LL.LLLLLLLLLL.LLLLLLLLLL.LLLLLLLLLLL,LLLLLLLLLLLLLLLLLLLLLLLLLL.L.LLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLL..LLLLL.LLLLLLLLLLLLLLLL,LLLLLLLLLLLLLLLLL..LLL..LLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLL..LL.LLLLLLL.LLLLL.LLLL.LLLLLLLLLLL,...LL........L..L......L.LL.....L........L.L.L.L.L.L....L.L...L......LL.......L..L..LL.L...,LLLLLLLLLLLLLLLLL.LLLL.LLLLL.LLLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLLLLLLL,LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLL.LLL.LLLLL.LLLLLLL.LLLLLLLLLL.LLLLLLLLLLL,LLLLLLLLL.LLLLLLL..LLLLLLLLL.LLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLL.LLLLLLLLL.LLLL.LLLLLLLLLLL,LLLLLLLLL.LLLLLLL.LLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LLLL.LLLLLLLLLLL,LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLL.L.LLLLL.LLLL.LLLLLLLLLLL,LL.......L...LLL.....L...L........L...LL....L....L.L...L..LL.LL...LL.L.LL...L......LLL.LLL.,LLLL.L.LL.LLLLLLL.LLLL.LLLLLLLLL.L.LLLLLLLLLLLLLLL.LLLL.LLLL.LLLLLLL.LLLLL.LLL..LLLLLLL.LLL,LLLLLLLLL.LLLLLLL.LLLL.LLLLL.LLLLL.LLLLLL.LLLLLL.L.L.LLLLLLLLLL.LLLLLL.LLL.LLLLLLLLLLLLLLLL,LLLLLLLLL.LLLLLLL.LLLL.LLLLL.LLLLL.LLLLLL.LLLLLLLL.LLLLL.LLL.LLLLLLLLLLLLL.LLLL.LLLLLLLLLLL,LLLLLLLLL.LLLLLLL.LLLL.LLL.L.LLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLL.LLLLLLLLLLL,LLLLLLLLL.LLLLLLLLLL.L.LLLLL..LLLL.LLLLLL.LLLLLLL..LLLLLL.LLLLLLLLLL.LLLLLLLLLL.LLLLLLLLLLL,L..L.LLLL.LLL..L...LLL.LL.LLL...L.L.......L.L.....L...LL.LL..L.LL..LL....L......LLLL.......,L..LLLLL.LLLLLLLL.L.LLLLL.LL.LLLLL.LLLLLL.LLLLLLLL..LLLLLLLLLLLLL.LL.LLLLL.LLLLLLLL..LLLLLL,LLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLL.LLLLLLLLLLL,LLLLLLLLL.L.LLLLL.LLLLLLLLLL.LLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL.LLL.L.LL.L.LLLLLLLLLLL,LLLLLLLLL.LLLLLLL.LLLL.LLLLL.LLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLLLL.,LLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLL.LLL.LLL.LLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLL..LLL.LLLLLLLLLLL,LLLLLLLLL.LLLLLL..LLLL.LLLLL.LLLLL.LLLL.L.LLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLL.LLLL.LLLLLL..LLL,LLLLLLL.L.L.LLLLLLLL.LLLLLLL.LLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLL.L..L.LLLLLLL.LLL,LLLLLLLLL.LLLLLLL.LLLL.LLLLLLLLLLLLLLLLLL.LL..LLLLLLLLLLLLLL.LLLLLLLLLLLLL..LLLLLL.LLLLLLLL,......L...L..L..L.....LLL.L.L..L..LL..............L....L.LL.......L..L....L..........LLL...,LLLLLLLLL.LLLLLLL.LLLL.LLLLLLLLLL..LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLL.L.LL.LLLL..LLLLLLLLL.,LLLLLLLLL.LLLL.LL..LLL.LLLLL..LLLLL.LLLLLLLL.LLL.L.LLLLLLLLLLLLL.LLL.LLLLL.LLLL.LLLLLLLLLLL,LLLLLLLLL.LLLLLLL.LLLL.LLLLLLLLLLL.LLLL.LL.LLLLLLLLLLLLLLL.LLLL.LLLL.LLLLL.LLLL.LLLLLLLLLLL,LLLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLL.LLLLLLLLLLLLLLL.LLLLLLLLL.LLLLL.LLLL.LLLLLLL.LLLLLLLLLLL,LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLL.L.LLLLLLLLLL.LLLLLLLLLL.L.LLLL.LLLL.LLLLLL,LLLLLLLLL..LLLLLL.LLLL.LLLLL.LLLLLLLLLLL..LLLLLLLLLLLLLLLLLL.LLLLLLL.LL.LL.LLLLLLLLLLLLLLLL,LLLLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLL..LLL.LLLLLLLLLLL,LLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLL,LLLLLLLLL.LLLLLLL.LLLL.LLLLL.LLLLL.LLLLLL.LLLLLLLLLLLLLLLLL..LLLLL.L.LLLLL.LLLLLLLLLLLLLLLL,LLLLLLLLLLLLLLLLL.LLLL.LLLLL.LLL.L.LLLLLL.LLLLLLLL...LLLLLLLLLLLLLLL.LLLLL.LLL..LLLL.LLLLLL"
const parse = data => data.split(',').map(row => row.split(''));

export const test = () => parse(testRaw);
export const real = () => parse(realRaw);