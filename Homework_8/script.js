/* Сергей Дедков
    Практическое задание 2:
    Добавить в класс Cat приватное свойство foodAmount, равное 50, и приватный метод formatFoodAmount, который
    будет возвращать это свойство + слово 'гр.'. В методе feed необходимо выводить в консоль информацию вида:
      "Насыпаем в миску (количество гр.) корма."
    "Количество гр." получаем с помощью метода formatFoodAmount.
    Вывести в консоль результат выполнения метода feed.

Практическое задание 3:
    Написать единый геттер-сеттер dailyNorm для установки/получения количества корма (foodAmount).
    Оно не должно быть меньше 50 и больше 500 грамм. В случае некорректного количества возвращать сообщение об ошибке.
    Если функция вызывается как геттер - она должна возвращать уже отформатированное значение foodAmount.
    Протестировать метод dailyNorm с разными значениями параметра и без него. Метод feed должен оперировать актуальной
    информацией (использовать внутри метода вызов геттера).
*/

function Cat(name) {
    this.name = name;
    var foodAmount = 50;

    function formatFoodAmount() {
        return foodAmount + 'гр.'
    }
    this.feed = function() {
        console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
    };
    this.dailyNorm = function(amount) {
        if (!arguments.length) return formatFoodAmount();
        if (amount < 50) {
            throw new Error('Котику не хватит');
        }
        if (amount > 500) {
            throw new Error('Котик лопнит');
        }
        foodAmount = amount
    }
}

var barsik = new Cat('Барсик');

console.log(barsik.name);

console.log(barsik.dailyNorm())
console.log(barsik.feed());

/*
        Практическое задание 4:
        Создать класс Animal. Перенести в него все свойства и методы. Отнаследоваться внутри Cat от Animal.
        Расширить метод feed для кошек. Теперь он должен выводить в консоль информацию вида:
        "Насыпаем в миску (количество гр.) корма.
        Кот доволен ^_^"
        Использовать вызов родительского метода вида animalFeed() и сохранение контекста this через переменную.
        Все вызовы, которые работали ранее, должны по-прежнему работать корректно.
        Практическое задание 5:
        Добавить публичный метод stroke, который будет выводить в консоль информацию "Гладим кота.".
        Доделать метод feed таким образом, чтобы можно было цепочкой вызывать его и метод stroke в любой
        последовательности и сколько угодно раз.
        (Лишние логи можно убрать, делать всё в том же задании).
*/

function Animal(name) {
    this.name = name;
    this._foodAmount = 50;
    var self = this;
    this._formatFoodAmount = function() {
        return this._foodAmount + 'гр.'
    }
    this.feed = function() {
        console.log('Насыпаем в миску ' + self.dailyNorm() + ' корма.');
    }
    this.dailyNorm = function(amount) {
        if (!arguments.length) return this._formatFoodAmount();
        if (amount < 50) {
            throw new Error('Котику не хватит');
        }
        if (amount > 500) {
            throw new Error('Котик лопнит');
        }
        this._foodAmount = amount;
    }
}

function Cat(name) {
    Animal.apply(this, arguments);

    var feedForCat = this.feed;
    this.feed = function() {
        feedForCat();
        console.log('Кот доволен ^_^');
        return this;
    }

    this.stroke = function() {
        console.log('Гладим кота');
        return this;
    }

}

var barsik = new Cat('Барсик');

console.log(barsik.name);
console.log(barsik.dailyNorm());
barsik.feed();
barsik.feed().stroke().feed().stroke();