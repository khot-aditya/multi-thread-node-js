const jobs = Array.from({ length: 100 }, () => 1e9);

const tick = performance.now();



const tock = performance.now()

console.log(`runtime = ${tock - tick}ms`) // runtime = 48 seconds