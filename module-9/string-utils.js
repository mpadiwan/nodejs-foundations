function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverse(str) {
  if (!str) return '';
  return str.split('').reverse().join('');
}

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).length;
}

function isEmail(str) {
  if (!str) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
}

module.exports = { capitalize, reverse, countWords, isEmail };