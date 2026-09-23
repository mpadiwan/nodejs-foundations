let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let doubledNumbers = numbers.map(num => num * 2);

let evenNumbers = numbers.filter(num => num % 2 === 0);

let sumOfNumbers = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

console.log('Doubled Numbers:', doubledNumbers);
console.log('Even Numbers:', evenNumbers);
console.log('Sum of Numbers:', sumOfNumbers);