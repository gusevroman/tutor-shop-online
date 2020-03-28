function incrementString(strng) {
  // return incrementedString
  if (Number.isInteger(strng)) return strng + 1;
  return strng.length === 0 ? '1' : strng
    .replace(/([a-z]+)/g, '$1 ')
    .split(' ')
    .map((el, i) => {
      if (i == 1) {
        if (el.length === 0) {
          el = '1';
        } else {
          let l = el.length;
          el = `${+el + 1}`;
          l -= el.length;
          el = '0'.repeat(l > 0 ? l : 0) + el;
        }
      }
      return el;
    })
    .join('');
}


function incrementString3(strng) {
  const strArray = strng.match(/(\D*)(0*)([1-9]*)/);
  strArray[3] = Number(strArray[3]) + 1;
  let newString = strArray[1] + strArray[2] + strArray[3];
  if (newString.length !== strng.length) {
    strArray[2] = strArray[2].slice(0, strArray[2].length - 1);
    newString = strArray[1] + strArray[2] + strArray[3];
  } return newString;
}

//
function incrementString4(input) {
  if (isNaN(parseInt(input[input.length - 1]))) return `${input}1`;
  return input.replace(/(0*)([0-9]+$)/, (match, p1, p2) => {
    const up = parseInt(p2) + 1;
    return up.toString().length > p2.length ? p1.slice(0, -1) + up : p1 + up;
  });
}


function incrementString5(input) {
  const body = input.slice(0, -1);
  const lastDigit = input.slice(-1).match(/[0-9]/);
  if (lastDigit === null) { return `${input}1`; }
  if (lastDigit != '9') { return body + (parseInt(lastDigit) + 1); }
  return `${incrementString(body)}0`;
}

function updStr6(input) {
  return input.replace(
    /([0-8]?)(9*)$/,
    (s, d, ns) => `${+d + 1}${ns.replace(/9/g, '0')}`,
  );
}

const incrementString8 = (s) => s.replace(/[0-8]?9*$/, (m) => String(++m));

// (el) => (el ? sliceNum(el) : ''));

const updStr = (str) => str
  .replace(
    /([0-8]|\d?9+)?$/,
    (el) => (el ? +el + 1 : ''),
  );

const sliceNum = (num) => ((num.toString().length === (num + 1).toString().length) ? num : (num + 1).toString().slice(1));

const updStr5(str):
    num = (int(('1' if s.startswith('0') else '') + str)+1).toString()
    return num[1:] if s.startswith('0') else num


const word1 = '00004'; // -> "00005"
const word2 = 'F3#00000089'; // -> "F3#00000090"
const word3 = '999999'; // -> "000000"
const word4 = 'F3#99999'; // -> "F3#00000"
const word5 = 'QWER'; // -> "QWER"
const word6 = '12000'; // -> "12001"
const word7 = '0a9999999999999999999999'; // -> "12001"
console.log(incrementString8(word1));
console.log(incrementString8(word2));
console.log(incrementString8(word3));
console.log(incrementString8(word4));
console.log(incrementString8(word5));
console.log(incrementString8(word6));
console.log(incrementString8(word7));
console.log(updStr6(word1));
console.log(updStr6(word2));
console.log(updStr6(word3));
console.log(updStr6(word4));
console.log(updStr6(word5));
console.log(updStr6(word6));
console.log(updStr6(word7));
console.log(sliceNum(99099809));
