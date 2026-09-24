const { capitalize, reverse, countWords, isEmail } = require('./string-utils');

describe('String Utilities', () => {
  describe('capitalize', () => {
    test('capitalizes the first letter of a string', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    test('handles empty strings', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('reverse', () => {
    test('reverses a string', () => {
      expect(reverse('hello')).toBe('olleh');
    });

    test('handles empty strings', () => {
      expect(reverse('')).toBe('');
    });
  });

  describe('countWords', () => {
    test('counts the number of words in a string', () => {
      expect(countWords('hello world')).toBe(2);
    });

    test('handles empty strings', () => {
      expect(countWords('')).toBe(0);
    });
  });

  describe('isEmail', () => {
    test('returns true for valid email addresses', () => {
      expect(isEmail('user@example.com')).toBe(true);
    });

    test('returns false for invalid email addresses', () => {
      expect(isEmail('invalid-email')).toBe(false);
    });
  });
});
