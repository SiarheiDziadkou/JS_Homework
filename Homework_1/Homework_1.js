//Сергей Дедков
//Даны две переменных a и b. Как, без сложных манипуляций, можно поменять их значения местами?
var a = 10;
var b = 15;
//Решение
var c = a;
a = b;
b = c;
console.log(a);
console.log(b);