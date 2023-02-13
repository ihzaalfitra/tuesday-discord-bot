const wordInString = (s, word) => new RegExp('\\b' + word + '\\b', 'i').test(s);

// tests
[
  'tue',
	'tue?'
].forEach(q => console.log(
  wordInString('tue, what do you think about capitalism huh tue?', q)
))
