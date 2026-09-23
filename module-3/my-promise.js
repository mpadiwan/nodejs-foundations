// Create a file called my-promise.js. Write a function called wait(ms) that returns a promise that resolves after ms milliseconds with the message 'Done waiting!'.

// Then call it three ways:
// • Using .then()
// • Inside an async function with await
// • With await inside a try/catch (even though it won't throw — practice the syntax)

// Run it with: node my-promise.js

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Done waiting!');
    }, ms);
  });
}

// Using .then()
wait(1000).then((message) => {
  console.log('Using .then():', message);
});

// Inside an async function with await
async function waitWithAwait() {
  const message = await wait(2000);
  console.log('Inside async function with await:', message);
}
waitWithAwait();

// With await inside a try/catch
async function waitWithTryCatch() {
  try {
    const message = await wait(3000);
    console.log('With await inside try/catch:', message);
  } catch (error) {
    console.error('Error:', error);
  }
}
waitWithTryCatch();

module.exports = { wait };