  function getNumber() {
    return new Promise(resolve => {
      setTimeout(() => resolve(42), 500);
    });
  }

  async function main() {
    const number = await getNumber();
    console.log('The number is:', number);
  }

  main();
