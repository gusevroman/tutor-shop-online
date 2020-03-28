// Написать класс, содержащий следующие методы:
// возвращающий список тегов для категорий, элементы в списке не должны повторяться;
// возвращающий категории по заданному тегу, в качестве входного параметра принимает имя тега;
// возвращающий наименования категорий на заданном языке, в качестве входного параметра принимает 2-х значный код языка;
// возвращающий список игр, поддерживающих демо режим (hasDemo: 1);
// возвращающий список игр по заданному ID мерчанта, в качестве входного параметра принимает ID мерчанта;
// возвращающий список мерчантов, поддерживающих заданную валюту, в качестве входного параметра принимает 3-х значное
// (валюты, которые поддерживают мерчанты хранятся в объекте merchantCurrencies).
// Все методы класса должны быть максимально оптимизированы.

const fs = require('fs');
const path = require('path');

const pathFileJSON = (file) => path.join(
  path.dirname(process.mainModule.filename), file,
);

// const fileJSON = 'games_copy.json'; // test (!) file JSON
// console.log('pathFileJSON:', pathFileJSON(fileJSON));

class JSONReader {
  constructor(filename) {
    this.filename = filename;
  }

  static readFileInfo(file) {
    console.log(`Start reading JSON from file: ${pathFileJSON(file)} ...`);
  }

  // eslint-disable-next-line class-methods-use-this
  // возвращающий список тегов для категорий, элементы в списке не должны повторяться;
  async getTags(file) {
    let tags = [];
    const data = await this.readFileJson(file);
    const { categories } = data;
    categories.forEach((el) => {
      tags = tags.concat(el.Tags);
    });
    tags = Array.from(new Set(tags));
    console.log(tags);
    return tags;
  }

  // eslint-disable-next-line class-methods-use-this
  async readFileJson(file) {
    return new Promise((resolve, reject) => {
      JSONReader.readFileInfo(file);
      fs.readFile(pathFileJSON(file), 'UTF-8', (err, data) => {
        if (err) {
          reject(new Error(`Error reading file ${file}`));
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }

//   const fs = require('fs');
//   const util = require('util');

//   const readdir = util.promisify(fs.readdir);
  
//   async function myF() {
//   let names;
//   try {
//     names = await readdir('path/to/dir');
//   } catch (err) {
//     console.log(err);
//   }
//   if (names === undefined) {
//     console.log('undefined');
//   } else {
//     console.log('First Name', names[0]);
//   }
// }




// возвращающий категории по заданному тегу, в качестве входного параметра принимает имя тега;
getCategory(tag) {

}

// возвращающий наименования категорий на заданном языке, в качестве входного параметра принимает 2-х значный код языка;
getName() { }

// возвращающий список игр, поддерживающих демо режим (hasDemo: 1);
getG() {

}
  // возвращающий список игр по заданному ID мерчанта, в качестве входного параметра принимает ID мерчанта;
  // возвращающий список мерчантов, поддерживающих заданную валюту, в качестве входного параметра принимает 3-х значное
  // (валюты, которые поддерживают мерчанты хранятся в объекте merchantCurrencies).
}


const egJSON = new JSONReader();
const fileJson = 'games.json';
// egJSON.getTags(fileJson);
// egJSON.getTags(fileJson);
egJSON.getTags(fileJson);
// console.log(egJSON.getTags(fileJson));

// egJSON.readFileJson(fileJson);
// console.log(egJSON.readFileJson(fileJson));
// console.log(`egJSON.getFile: >>>>>> ${egJSON.readJSON('game_copy.json')}`);
// const da = egJSON.readJSON('game_copy.json');
// console.log(da);
