// EXERCISE: 3.3 — Sequential vs Parallel
// Create a file called parallel.js. Reuse the wait function from Exercise 3.1.

// Part A — Sequential:
// • Call wait(1000) three times in a row, awaiting each
// • Time how long it takes (use console.time and console.timeEnd)
// • It should take about 3 seconds

// Part B — Parallel:
// • Use Promise.all to run three wait(1000) calls at the same time
// • Time it again
// • It should take about 1 second

// This exercise teaches you a critical optimization: parallel async operations are massively faster than sequential ones.

// Run it with: node parallel.js

const { wait } = require('./my-promise');

// Part A — Sequential
async function sequentialWait() {
  console.time('Sequential Wait');
  await wait(1000);
  await wait(1000);
  await wait(1000);
  console.timeEnd('Sequential Wait');
}

// Part B — Parallel
async function parallelWait() {
  console.time('Parallel Wait');
  await Promise.all([wait(1000), wait(1000), wait(1000)]);
  console.timeEnd('Parallel Wait');
}

(async () => {
  await sequentialWait();
  await parallelWait();
})();