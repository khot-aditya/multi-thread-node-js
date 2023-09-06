const { Worker } = require("worker_threads");
const os = require('os');

function chunkify(array, n) {
    let chunks = [];
    for (let i = n; i > 0; i--) {
        chunks.push(array.splice(0, Math.ceil(array.length / i)))
    }
    return chunks;
}

function run(jobs, concurrentWorkers) {

    const chunks = chunkify(jobs, concurrentWorkers);

    const tick = performance.now();
    let completedWorkers = 0;

    chunks.forEach((data, i) => {
        const worker = new Worker("./worker.js")
        worker.postMessage(data);

        worker.on("message", () => {
            console.log(`Worker ${i} completed`)

            completedWorkers++;

            if (completedWorkers === concurrentWorkers) {
                console.log(`${concurrentWorkers} workers took ${performance.now() - tick}ms`)

                process.exit();
            }
        })
    })
}

const jobs = Array.from({ length: 100 }, () => 1e9);


const osCore = os.cpus().length;

run(jobs, osCore);
// 1 workers took 62221.32159999758ms
// 2 workers took 28322.9151000008ms
// 10 workers took 12347.032899998128ms