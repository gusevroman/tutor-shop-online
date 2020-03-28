// Написать класс, содержащий следующие методы:
// возвращающий список тегов для категорий, элементы в списке не должны повторяться;
// возвращающий категории по заданному тегу, в качестве входного параметра принимает имя тега;
// возвращающий наименования категорий на заданном языке, в качестве входного параметра принимает 2-х значный код языка;
// возвращающий список игр, поддерживающих демо режим (hasDemo: 1);
// возвращающий список игр по заданному ID мерчанта, в качестве входного параметра принимает ID мерчанта;
// возвращающий список мерчантов, поддерживающих заданную валюту, в качестве входного параметра принимает 3-х значное
// (валюты, которые поддерживают мерчанты хранятся в объекте merchantCurrencies).
// Все методы класса должны быть максимально оптимизированы.

class JSONReader {
  constructor() {

  }

  // возвращающий список тегов для категорий, элементы в списке не должны повторяться;
  getTags() {

  }

  // возвращающий категории по заданному тегу, в качестве входного параметра принимает имя тега;
  getCategory(tag) {

  }

  // возвращающий наименования категорий на заданном языке, в качестве входного параметра принимает 2-х значный код языка;
  getName() { }
  // возвращающий список игр, поддерживающих демо режим (hasDemo: 1);
  getG
  // возвращающий список игр по заданному ID мерчанта, в качестве входного параметра принимает ID мерчанта;
  // возвращающий список мерчантов, поддерживающих заданную валюту, в качестве входного параметра принимает 3-х значное
  // (валюты, которые поддерживают мерчанты хранятся в объекте merchantCurrencies).
}

// _______________________ task 1______start

// Написать функцию для перевертывания букв во всех словах предложения.
// Пример: func('Abc def, ght.') => 'Cba fed, thg.' // cbA ,fed .thg

// v1
console.log('>>>>>Task 1. Reverse words<<<<<');

const reverseString = (str) => str.split(' ') // разбили предложение на слова
  .map(
    ((el) => el.split('') // каждое слово преобразовали в массив символов
      .reverse() // к полученному массиву применили метод массивов reverse и перевернули массив
      .join('')), // массив символов преобразовали в строку
  )
  .join(' '); // массив слов преобразовали в предложение

const string = 'Abc def, ght.';
console.log(`reverseString(${string}): ${reverseString(string)}`);

// v with regex
const reverseStr = (str) => str.split('').reverse().join('');

const reverseRegString = (str) => str.split(' ')
  .map(
    ((el) => el.replace(/(\w+)/, reverseStr(el))
    ),
  )
  .join(' ');

const stringSentence = 'Abc def, ght.';
console.log(`>>>!!!!!>>>>>>  reverseRegString(${stringSentence}): ${reverseRegString(stringSentence)}`);

// Метод split() принимает на вход строку и преобразует в массив, разбивая ее по разделителю.
// Метод reverse() переворачивает элементы массива. Первый элемент становится последним, последний — первым.
// Метод join() соединяет все элементы массива в строку.

// v2
const reverseRecurseString = (str) => ((str === '') ? '' : reverseRecurseString(str.substring(1)) + str.charAt(0));
console.log(`reverseRecurseString('Welcome') ${reverseRecurseString('Welcome')}`);
console.log(`reverseRecurseString('Abc def, ght.') ${reverseRecurseString('Abc def, ght.')}`);

// Метод substr() возвращает указанное количество символов из строки, начиная с указанной позиции.
// Если не указывать количество символов — вернет все символы, начиная с указанной позиции:
// 'hello'.substr(1); // 'ello'
// Метод charAt() возвращает указанный символ из строки:
// 'hello'.charAt(0); // 'h'

// v3
//  irregular
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/replace
let sentence = 'Abc def, ght.';
sentence = sentence.replace(/^\s+|\s+$/g, ' ');
console.log(sentence.replace(/^\s+|\s+$/g, ' '));

// _______________________ task 1______end


// _____________ task 2______ START
// Написать функцию, которая находит сумму всех чисел кратных 3 или 5 до заданного числа.
// Например для func(10) = 23
console.log('>>>>>Task 2. Sum Multiplate:<<<<<');

const sumMultiples = (number, mult1 = 3, mult2 = 5) => {
  let sum = 0;
  for (let i = 1; i <= number; i++) {
    if (i % mult1 === 0 || i % mult2 === 0) {
      sum += i;
    }
  }
  return sum;
};

console.log('sumMultiples', sumMultiples(10));

// _____________ task 2______ END


// _____________ task 3______START
// Написать функцию валидации IPv4 адреса в Dot-десятичной нотации. IP является валидным, если состоит из четырех октетов,
// со значениями от 0 до 255 включительно. На вход функции подается строка. На выходе ожидается булево значение true или false.
// Не использовать регулярные выражения.
// Примеры
// Валидные: 1.2.3.4, 123.45.67.89
// Невалидные: 1.2.3, 1.2.3.4.5, 123.456.78.90, 123.045.067.089

console.log('>>>>>Task 3. Validate IPv4: <<<<<');

const validatorIP = (addressIPv4) => {
  const arrayAddresses = addressIPv4.split('.');
  console.log(arrayAddresses)
  let res = true;
  if (arrayAddresses.length !== 4) {
    return false;
  }

  arrayAddresses.forEach((address) => {
    if (address.length === 0 || typeof address === "string" || address.length === parseInt(address)) res = false
    if (address < 0 || address > 255) res = false;
  });
  return res;
};


const testAddress = '123.1.67.089';
console.log(`Test Address ${testAddress} on validate is ${validatorIP(testAddress)}`);

// _____________ task 3______END


// ______________ task 1 va Alex _____ START
const fun = (str) => {
  let arr = str.toLowerCase().split(' ');
  const reg = new RegExp(/[,.?!:]/);
  arr = arr.map((el) => {
    let s = '';
    if (reg.test(el)) {
      s = el[el.length - 1];
      el = el.slice(0, -1);
    }
    el = el.split('').reverse().join('');
    el += s;
    return el;
  });
  return arr.join(' ')[0].toUpperCase() + arr.join(' ').slice(1);
}

console.log(fun("ABc: deF, ght.")); 

// ______________ task 1 va Alex _____ END
