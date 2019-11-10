/* Сергей Дедков
Задание 1:
Написать функцию, принимающую массив имен и возвращающую массив объектов вида {name: 'Vasya'}.
*/

function getName(arr) {
    var arrObj = arr.map(function(el, i) {
        return { name: el }
    });
    return arrObj
}

getName(['Vasya', 'Petia', 'Kolia', 'Max']);

/*
Задание 2:
Написать функцию, принимающую массив вида ['00', '13', '24'] и возвращающую строку "Текущее время : 00 : 13 : 24".
Для решения использовать перебирающий метод массивов.
*/

function getTime(time) {
    /*var stringTime = 'Текущее время'
    time.reduce(function(accum, el){
       return accum + ':' + el;
    }, stringTime); 
    return stringTime;    Если можно, объяснить почему не работает при таком синтаксисе*/
    return time.reduce(function(accum, el) {
        return accum + ' : ' + el;
    }, 'Текущее время');
}

getTime(['00', '13', '24']);

/*
Задание 3:
Написать чистую функцию, которая будет возвращать количество гласных в переданном тексте. Регистр любой. Решение не
должно быть "топорным".
*/

function findVowels(text) {
    text = text.toLowerCase();
    var n = 0;
    var vowels = ['a', 'e', 'i', 'o', 'u', 'y', 'а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
    for (var i = 0; i < text.length; i++)
        for (var j = 0; j < vowels.length; j++)
            if (text[i] === vowels[j]) {
                ++n;
                break;
            }
    return n ? n : alert("Нет совпадений");
}

console.log(findVowels('aAffаафЮюфyyАУ'));

/*
Задание 4:
Написать функцию, которая будет принимать текст в качестве параметра. У текста должны быть пробелы, точки, запятые,
восклицательные и вопросительные знаки. Текст необходимо разбить на предложения (по точкам, восклицательным и
вопросительным знакам - убрав их - разрешается использовать регулярное выражение в методе split).
Для каждого из предложений вывести текст предложения и рядом количество букв в нем (без учета пробелов, запятых
и т.д. - именно букв).
*/

function sentencesAndLetters(text) {
    var sentences = text.split(/[!.?]/);
    sentences.splice(length + 1, 1);
    var letters = sentences.map(function(item) {
        item = item.trim().split(/[ ,:;]/)
        return item.reduce(function(sum, el) {
            return sum + el.length
        }, 0)
    })
    for (i = 0; i < sentences.length; i++) {
        console.log(sentences[i] + ' (в предложении ' + letters[i] + ' букв)')
    }
}

sentencesAndLetters('Скажи мне, дядя. Ведь не даром, Москва спалённая пожаром, французу отдана? Ведь были ж схватки боевые. Да, говорят, еще какие!');

/*
Задание 5 *:
Написать функцию, которая будет находить в переданном ей тексте наиболее часто повторяемое слово и возвращать
информацию вида:
"Максимальное число повторений у слова "привет" - 8"
При решении предположить, что у двух и более слов не может быть одинакового количества повторений.
Для удобного разделения текста на слова сразу по нескольким знакам препинания - разрешается использовать регулярное
выражение в методе split.
*/

function calcRepeats(text) {
    var ourText = text.toLowerCase().split(/[?!:.\s=,]/).filter(Boolean);
    var result = {};
    var repeats = ourText.filter(function(el, i, arr) {
        return arr.indexOf(el) !== i || arr.lastIndexOf(el) !== i;
    });
    repeats.forEach(function(el) {
        result[el] = result[el] + 1 || 1;
    });
    for (var key in result) {
        console.log(' Максимальное число повторений у слова ' + '"' + key + '"' + ' - ' + result[key]);
    }
}

calcRepeats('АНТОХА МС - Бабки: Если бабки на исходе. Не впадай в грусть, братец, ты. Голодуха может быть полезной. Похудеешь, хапанешь чуть-чуть тоски.');