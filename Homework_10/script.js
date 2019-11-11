/* Сергей Дедков
Задание 1:
Переписать задачу с использованием перебирающего метода массивов:
    function filterNumbersArr(numbers) {
        var newArr = [];

        for (var i = 0; i < numbers.length; i++) {
            var el = numbers[i];

            if (el > 0) {
                newArr[newArr.length] = el;
            }
        }

        return newArr;
    }

    filterNumbersArr([-1, 0, 2, 34, -2]);
*/

function felterNumberArr(arr) {
    var arr = arr.filter(function(number) {
        return number > 0;
    });
    console.log(arr);
}
felterNumberArr([-1, 0, 2, 34, -2]);

/*
Задание 2:
Написать функцию, принимающую массив чисел и возвращающую первое найденное положительное число.
*/

function foundPositive(arr) {
    var positive = arr.find(function(arr) {
        return arr > 0;
    });
    return positive
}

foundPositive([-1, 0, 2, 34, -2]);

/*
Задание 3:
Написать функцию, которая будет определять, является ли переданное в нее слово палиндромом (напр. шалаш).
Регистр в словах учитываться не должен. Тестировать функцию можно только на одиночных словах (без фраз).
Функция должна работать следущим образом:
    isPalindrome('шалаШ'); // true
    isPalindrome('привет'); // false
*/

function isPalindrome(originalString) {
    originalString = originalString.toLowerCase();
    var reverseString = originalString.split('').reverse().join('');
    return reverseString == originalString
}

isPalindrome('шалаШ');
isPalindrome('привет');

/*
Задание 4:
Написать функцию, которая будет определять, являются ли переданные в нее слова анаграммами (напр. кот и отк).
Регистр в словах учитываться не должен.
Функция должна работать следущим образом:
    areAnagrams('кот', 'отк'); // true
    areAnagrams('кот', 'атк'); // false
    areAnagrams('кот', 'отко'); // false
*/

function areAnagrams(param1, param2) {
    var testAnagrams1 = param1.toLowerCase().split('').sort().join('');
    var testAnagrams2 = param2.toLowerCase().split('').sort().join('');
    return testAnagrams1 == testAnagrams2;
}
// ну или как говорит мой преподаватель по JS: "вообще если хотите сделать по красоте" то:
function areAnagrams(param1, param2) {
    return param1.toLowerCase().split('').sort().join('') === param2.toLowerCase().split('').sort().join('');
}

areAnagrams('кот', 'отк');
areAnagrams('кот', 'атк');
areAnagrams('кот', 'отко');

/*
Задание 5:
Написать функцию, которая будет разбивать массив на под-массивы определенной длины.
Функция должна работать следущим образом:
    divideArr([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
    divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]
*/

function divideArr(array, arraySize) {
    var arrayResult = [];

    for (var i = 0; i < array.length; i += arraySize) {
        arrayResult.push(array.slice(i, i + arraySize));
    }

    return arrayResult;
}

divideArr([1, 2, 3, 4], 2);
divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3);