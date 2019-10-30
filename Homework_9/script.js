/*  
Задание 1:
Переписать предыдущий пример с кошками на прототипный стиль ООП.
*/

function Animal(name) {
    this.name = name;
    this._foodAmount = 50;
    /*var self = this;*/
}
Animal.prototype._formatFoodAmount = function() {
    return this._foodAmount + 'гр.'
}
Animal.prototype.feed = function() {
    console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
}
Animal.prototype.dailyNorm = function(amount) {
    if (!arguments.length) return this._formatFoodAmount();
    if (amount < 50) {
        throw new Error('Котику не хватит');
    }
    if (amount > 500) {
        throw new Error('Котик лопнит');
    }
    this._foodAmount = amount;
}


function Cat(name) {
    Animal.apply(this, arguments);
}

Cat.prototype.__proto__ = Animal.prototype;
Cat.prototype.constructor = Cat;

Cat.prototype.feed = function() {
    Animal.prototype.feed.apply(this, arguments);
    console.log('Кот доволен ^_^');
    return this;
}

Cat.prototype.stroke = function() {
    console.log('Гладим кота');
    return this;
}

var barsik = new Cat('Барсик');

console.log(barsik.name);
console.log(barsik.dailyNorm());
barsik.feed();
barsik.feed().stroke().feed().stroke();

/*
Задание 2:
Написать функцию глубокого клонирования объектов. Клонироваться должны значения всех типов данных (+ массивы
и функции), а также любого уровня вложенности. Метод isArray использовать можно.
Протестировать работу функции можно на таком примере:
*/
/*
Задание 3:
Написать функцию глубокого сравнения объектов. 
Сравниваться должны значения всех типов, а также любого уровня вложенности. Хорошо протестировать работу функции.
*/

var initialObj = {
    string: 'Vasya',
    number: 30,
    boolean: true,
    undefined: undefined,
    null: null,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}]
        },
        object3: {}
    },
    method: function() {
        alert('Hello');
    }
}


function deepClone(obj) {
    var clone = new obj.constructor();

    for (var key in obj) {
        if (Array.isArray(obj[key])) {
            clone[key] = deepClone(obj[key]);
        } else if (typeof obj[key] === 'object' && (obj[key] != null)) {
            clone[key] = deepClone(obj[key]);
        } else clone[key] = obj[key];
    }

    return clone;
}

function deepCompare(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }

    if (obj1 == null || typeof obj1 != 'object' || obj2 == null || typeof obj2 != 'object') {
        return false;
    }
    for (var i in obj1) {
        if (obj1.hasOwnProperty(i) !== obj2.hasOwnProperty(i)) {
            return false;
        }
    }
    for (var i in obj2) {
        if (!deepCompare(obj1[i], obj2[i])) {
            return false;
        }
    }
    return true
}
var clonedObj = deepClone(initialObj);
deepCompare(initialObj, clonedObj);
console.log(initialObj);
console.log(clonedObj);
clonedObj.object.object2.array2[1].name = 'Vasya';
clonedObj.array.push(2);

















/*
     ДВе функции
     в одну передавать объекты для сравнения
     пройтись циклом for по всем ключам значений

     вторая функция
     проверка на типо if else (или switch)
      возращает название типа (отправлять в первую функцию)

     function deepCompare () {
        var i, l, leftChain, rightChain;
      
        function compare2Objects (x, y) {
          var p;
      
          // remember that NaN === NaN returns false
          // and isNaN(undefined) returns true
          if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
               return true;
          }
      
          // Compare primitives and functions.     
          // Check if both arguments link to the same object.
          // Especially useful on the step where we compare prototypes
          if (x === y) {
              return true;
          }
      
          // Works in case when functions are created in constructor.
          // Comparing dates is a common scenario. Another built-ins?
          // We can even handle functions passed across iframes
          if ((typeof x === 'function' && typeof y === 'function') ||
             (x instanceof Date && y instanceof Date) ||
             (x instanceof RegExp && y instanceof RegExp) ||
             (x instanceof String && y instanceof String) ||
             (x instanceof Number && y instanceof Number)) {
              return x.toString() === y.toString();
          }
      
          // At last checking prototypes as good as we can
          if (!(x instanceof Object && y instanceof Object)) {
              return false;
          }
      
          if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
              return false;
          }
      
          if (x.constructor !== y.constructor) {
              return false;
          }
      
          if (x.prototype !== y.prototype) {
              return false;
          }
      
          // Check for infinitive linking loops
          if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
               return false;
          }
      
          // Quick checking of one object being a subset of another.
          // todo: cache the structure of arguments[0] for performance
          for (p in y) {
              if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                  return false;
              }
              else if (typeof y[p] !== typeof x[p]) {
                  return false;
              }
          }
      
          for (p in x) {
              if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                  return false;
              }
              else if (typeof y[p] !== typeof x[p]) {
                  return false;
              }
      
              switch (typeof (x[p])) {
                  case 'object':
                  case 'function':
      
                      leftChain.push(x);
                      rightChain.push(y);
      
                      if (!compare2Objects (x[p], y[p])) {
                          return false;
                      }
      
                      leftChain.pop();
                      rightChain.pop();
                      break;
      
                  default:
                      if (x[p] !== y[p]) {
                          return false;
                      }
                      break;
              }
          }
      
          return true;
        }
      
        if (arguments.length < 1) {
          return true; //Die silently? Don't know how to handle such case, please help...
          // throw "Need two or more arguments to compare";
        }
      
        for (i = 1, l = arguments.length; i < l; i++) {
      
            leftChain = []; //Todo: this can be cached
            rightChain = [];
      
            if (!compare2Objects(arguments[0], arguments[i])) {
                return false;
            }
        }
      
        return true;
      }
      */