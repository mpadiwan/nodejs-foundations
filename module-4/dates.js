const dayjs = require('dayjs');

// Today's date
const today = dayjs();
console.log('Today\'s date:', today.format('YYYY-MM-DD'));
console.log('Day of the week:', today.format('dddd'));

// Date 7 days from now
const sevenDaysFromNow = today.add(7, 'day');
console.log('Date 7 days from now:', sevenDaysFromNow.format('YYYY-MM-DD'));
console.log('Day of the week:', sevenDaysFromNow.format('dddd'));

// Date 30 days ago
const thirtyDaysAgo = today.subtract(30, 'day');
console.log('Date 30 days ago:', thirtyDaysAgo.format('YYYY-MM-DD'));
console.log('Day of the week:', thirtyDaysAgo.format('dddd'));