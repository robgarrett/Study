var book = require('./book.js');
// Book2 returns a function.
var book2 = require('./book2.js')();

console.log('Name: ' + book.name);
book.read();

book2.rate(2);
console.log(book2.getPoints());
