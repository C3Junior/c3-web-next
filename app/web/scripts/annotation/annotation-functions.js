/**
 * Created by admin on 10.04.2016.
 */

var arrHashDict = {};
var dictData = {};



function bytesToString(bytes) {
    var bufView = new Uint8Array(bytes);
    return String.fromCharCode.apply(null, bufView);
}



var FStems = function() {
    this.fs = [
        [],
        [],
        [],
        [],
        []
    ];
    this.number = 0;
    this.addStem = function(stem) {
        var prev = this.fs[0];
        if (this.fs[4].length >= 5) {
            this.fs[4].shift();
            this.fs[4].push(stem);
        } else {
            if (this.fs[3].length == 4) {
                this.fs[4].push(this.fs[3][0]);
                this.fs[4].push(this.fs[3][1]);
                this.fs[4].push(this.fs[3][2]);
                this.fs[4].push(this.fs[3][3]);
                this.fs[4].push(stem);
            }
        }
        if (this.fs[3].length >= 4) {
            this.fs[3].shift();
            this.fs[3].push(stem);
        } else {
            if (this.fs[2].length == 3) {
                this.fs[3].push(this.fs[2][0]);
                this.fs[3].push(this.fs[2][1]);
                this.fs[3].push(this.fs[2][2]);
                this.fs[3].push(stem);
            }
        }
        if (this.fs[2].length >= 3) {
            this.fs[2].shift();
            this.fs[2].push(stem);
        } else {
            if (this.fs[1].length == 2) {
                this.fs[2].push(this.fs[1][0]);
                this.fs[2].push(this.fs[1][1]);
                this.fs[2].push(stem);
            }
        }
        if (this.fs[1].length >= 2) {
            this.fs[1].shift();
            this.fs[1].push(stem);
        } else {
            if (this.fs[0].length == 1) {
                this.fs[1].push(prev);
                this.fs[1].push(stem);
            }
        }
        this.fs[0] = stem;
        this.number = this.number + 1;
    };
    this.print = function() {
        console.log('1 = >' + this.fs[0]);
        console.log('2 = >' + this.fs[1].join(' '));
        console.log('3 = >' + this.fs[2].join(' '));
        console.log('4 = >' + this.fs[3].join(' '));
        console.log('5 = >' + this.fs[4].join(' '));
    };
    this.getStems = function(n) {
        if (n !== 0) {
            var args = Array.prototype.slice.call(this.fs[n]);
            return args.join(' ');
        } else
            return this.fs[0];
    };
};



// **************** HashArray **********************
var HashArray = function() {
    //Create JSON hash array.
    this.hash = {};

    this.add = function(key, value) {
        if (this.hash[key] === undefined)
            this.hash[key] = value;
    };

    this.clear = function() {
        this.hash = {};
    };

    this.get = function(key) {
        return this.hash[key];
    };

    this.set = function(key, value) {
        if (this.hash[key] !== undefined)
            this.hash[key] = value;
    };

    this.containsKey = function(key) {
        return this.hash[key] !== undefined;
    };

    this.containsValue = function(value) {
        for (var i in this.hash)
            if (this.hash.hasOwnProperty(i) && this.hash[i] === value)
                return true;
        return false;
    };

    this.toArray = function() {
        var arr = [];
        for (var i in this.Hash)
            if (this.Hash.hasOwnProperty(i))
                arr.push([i, this.Hash[i]]);
        return arr;
    };

    this.keys = function() {
        var array_keys = [];
        for (var key in this.hash) {
            array_keys.push(key);
        }
        return array_keys;
    };

    this.values = function() {
        var array_values = [];
        for (var key in this.hash) {
            array_values.push(this.hash[key]);
        }
        return array_values;
    };
};


// **************** DictStems **********************
function DictStems() {
    this.stems = [];
    this.addStem = function(stem) {
        function checkAvailability(arr, val) {
            return arr.some(function(arrVal) {
                return val === arrVal;
            });
        }
        if (!checkAvailability(this.stems, stem)) {
            this.stems.push(stem);
            return this.stems.length - 1;
        } else {
            return this.stems.indexOf(stem);
        }
    };
    this.getLength = function() {
        return this.stems.length;
    };
    this.print = function() {
        var arr = [];
        for (var i = 0; i < this.stems.length; i++) {
            arr.push(i + "\t=>\t" + this.stems[i]);
        }
        return arr.join('\n');
        //return this.stems.join(';');
    };
}

// **************** ConceptAndStemValue **********************
function ConceptAndStemValue(c1, s1, n1) {
    this.idConc = c1;
    this.idStem = s1;
    this.numbStems = n1;
    this.set = function(c, s, n) {
        this.idConc = c;
        this.idStem = s;
        this.numbStems = n;
    };
}

// **************** ConceptAndStemTable **********************
function ConceptAndStemTable() {
    this.table = [];
    this.add = function(c, s, n) {
        var value = new ConceptAndStemValue(c, s, n);
        this.table.push(value);
        return this.table.length - 1;
    };
    this.getLength = function() {
        return this.table.length;
    };
    this.print = function() {
        var arr = [];
        for (var i = 0; i < this.table.length; i++) {
            arr.push(i + "\t=>\t" + this.table[i].idConc + " \t " + this.table[i].idStem);
        }
        return arr.join('\n');
    };
}

// **************** DictConcepts **********************
function DictConcepts() {
    this.concepts = [];
    this.addConcept = function(c) {
        function checkAvailability(arr, val) {
            return arr.some(function(arrVal) {
                return val === arrVal;
            });
        }
        if (!checkAvailability(this.concepts, c)) {
            this.concepts.push(c);
            return this.concepts.length - 1;
        } else {
            return this.concepts.indexOf(c);
        }
    };
    this.getLength = function() {
        return this.concepts.length;
    };
    this.print = function() {
        var arr = [];
        for (var i = 0; i < this.concepts.length; i++) {
            arr.push(i + "\t=>\t" + this.concepts[i]);
        }
        return arr.join('\n');
    };
}

var isCyrillic = function(text) {
    return /[а-я]/i.test(text);
};

function intersection(A, B) {
    var m = A.length,
        n = B.length,
        c = 0,
        C = [];
    for (var i = 0; i < m; i++) {
        var j = 0,
            k = 0;
        while (B[j] !== A[i] && j < n) j++;
        while (C[k] !== A[i] && k < c) k++;
        if (j != n && k == c) C[c++] = A[i];
    }
    return C;
}

function diff(A, B) {
    var M = A.length,
        N = B.length,
        c = 0,
        C = [];
    for (var i = 0; i < M; i++) {
        var j = 0,
            k = 0;
        while (B[j] !== A[i] && j < N) j++;
        while (C[k] !== A[i] && k < c) k++;
        if (j == N && k == c) C[c++] = A[i];
    }
    return C;
}

function getMostFreqTokens(A) {
    A.sort();
    var current = null;
    var res = [];
    var cnt = 0;
    var out = '';
    for (var i = 0; i < A.length; i++) {
        if (A[i] != current) {
            if (cnt > 0) {
                out += current + '  --> ' + cnt + '  \r\n';
                if (cnt > 1)
                    res.push(current);
            }
            current = A[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        out += current + '  --> ' + cnt + ' ';
        if (cnt > 1)
            res.push(current);
    }
    //console.log('getMostFreqTokens #' + out);
    return res;
}

// ***************************** findCorrectWord **************************************

var stopWordRu = "";
var stopWordEng = "";

//функция-фильтр - оставляет только значимые слова - для стоп-слов и пунктуции возвращает false
var findCorrectWord = function(item) {
    var punct1 = '\\[' + '\\!' + '\\"' + '\\#' + '\\$' + // since javascript does not
        '\\%' + '\\&' + '\\\'' + '\\(' + '\\)' + // support POSIX character
        '\\*' + '\\+' + '\\,' + '\\\\' + '\\-' + // classes, we'll need our
        '\\.' + '\\/' + '\\:' + '\\;' + '\\<' + // own version of [:punct:]
        '\\=' + '\\>' + '\\?' + '\\@' + '\\[' +
        '\\]' + '\\^' + '\\_' + '\\`' + '\\{' +
        '\\|' + '\\}' + '\\~' + '\\]' + '\\»' +
        "\\«" + '\\—' + '\\‘' + '\\’',

        re = new RegExp('[' + punct1 + ']+', 'i');

    //if(re.test(item))
    //    return false;
    if (punct1.indexOf(item) != -1)
        return false;
    if (isCyrillic(item))
        return stopWordRu.indexOf(item) == -1;
    else
        return stopWordEng.indexOf(item) == -1;
};


// ***************************** findStemsInDict **************************************
// Выбирает максимально длинную стему находящуюся в tokens из в dict
// вход tokens массив с токенами, dict - хэш таблица словарь по предметной области
// выход хеш-таблица: ключ - словарное понятие, значение - количество повторений понятия в tokens
//var tokens=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'B', 'B', '.'];
//var dict={};
//dict['B']='B';
//dict['B C']='B C';
//dict['E']='E';
//dict['E F G']='E F G';
//dict['G H']='G H';
var findStemsInDict = function(tokens, dict) {
    this.findStems = new FStems();
    this.prevStems = [];
    this.founded = 0;
    this.prevFounded = 0;
    this.res = {};
    for (var i = 0; i < tokens.length; i++) {
        var stem = tokens[i];
        this.findStems.addStem(stem);
        for (var jj = 0; jj < 5; jj++) {
            if (this.findStems.fs[jj].length > 0) {
                var cs = this.findStems.getStems(jj);
                //console.log('cs= '+cs);
                if (dict[cs] !== undefined) {
                    this.founded = this.founded | (1 << jj);
                    //console.log(jj+'+f= '+cs);
                } else {
                    this.founded = this.founded & ~(1 << jj);
                    //console.log(jj+'-f= '+cs);
                }
            }
        }
        //this.findStems.print();
        if (
            /*this.prevFounded!=0 && this.founded!=0
             &&*/
            this.founded <= this.prevFounded) {
            if (this.prevFounded > 0) {

            }
            //console.log('push= ' +  this.prevFounded.toString(2));
            //console.log('prevStems= ' +  this.prevStems.join(', '));
            jj = 4;
            while (jj >= 0) {
                /*if(jj==0) {
                 if(((this.prevFounded) & 1) == 1) {
                 var fff = this.prevStems[jj];
                 var ff = dict[fff];
                 console.log('0= ' + ff);
                 if (this.res[ff] === undefined)
                 this.res[ff] = 0;
                 this.res[ff] += +1;
                 break;
                 }
                 else
                 jj++;
                 } else*/
                if (((this.prevFounded >> jj) & 1) == 1) {
                    var fff = this.prevStems[jj];
                    var ff = dict[fff];
                    //console.log(jj + '= ' + ff);
                    if (this.res[ff] === undefined)
                        this.res[ff] = 0;
                    this.res[ff] += 1;
                    break;
                } else
                    jj--;
            }
        }
        this.prevFounded = this.founded;
        for (jj = 0; jj < 5; jj++) {
            this.prevStems[jj] = this.findStems.getStems(jj);
        }
        //console.log(stem+'=>'+founded.toString(2));
        //console.log('res'+'=>'+'\n');
        //for(var k in res){
        //    console.log( k + " => " + res[k]);
        //}
    } //end for
    return this.res;
};
//var res = findStemsInDict(tokens, dict);
//console.log('res'+'=>'+'\n');
//for(var k in res){
//    console.log( k + " => " + res[k]);
//}


//****************************** hashLength **************************
// Эта функция позволяет узнать длину хэша
function hashLength(hash) {
    var counter = 0; // Иницилизируем счетчик
    for (var k in hash) // Перебираем хэш, полученный нами в параметрах.
        counter++; // Считаем очередной элемент
    return counter; // Возвращаем сколько насчитали
}



//****************************** parseDictionary **************************
// Функция обработки словаря хранящегося в текстовом файле CSV с разделителем ';'
// вход - имя файла
// выход - хеш-таблица
//var natural = require('natural');
stemmer = PorterStemmerRu;
stemmerEng = PorterStemmer;

var parseDictionary = function(data) {
    var hashDict = {};
    var dataDevided = data;
    dataDevided.forEach(function(item) {
        var columns = item.split(';');
        var basicConcept = columns[0];
        columns.forEach(function(column) {
            //var words1 = column.split(' ');
            var words1 = tokenize(column).filter(findCorrectWord);
            //console.log(words1);
            var itemHash = [];
            words1.forEach(function(word) {
                var stem;
                if (word.length > 3)
                    if (isCyrillic(word))
                        stem = stemmer.stem(word);
                    else
                        stem = stemmerEng.stem(word);
                else
                    stem = word /*.toLowerCase()*/ ;
                stem.replace(/ /gi, '');
                itemHash.push(stem);
            });
            if (hashDict[itemHash.join(' ')] === undefined)
                hashDict[itemHash.join(' ')] = basicConcept;
        });
    });
    console.log('Dictionary parsed. Count concepts=' + hashLength(hashDict));
    //console.log('Dictionary'+'=>'+'\n');
    //for(var k in hashDict){
    //    console.log( k + " => " + hashDict[k]);
    //}
    return hashDict;
};

//****************************** parseDictionaryToArr **************************
// Функция parseDictionary - парсит словарь и сохраняет его в arrHashDict
var parseDictionaryToArr = function(data) {
    arrHashDict.dict = parseDictionary(data);
};

//****************************** hashDictExt **************************
// Переменная hashDictExt - хранящая распарсенный словарь
//var hashDictExt = parseDictionary('./etc/files/tanen_index_all_mod_new.txt');
//var hashDictExt = arrHashDict['tanen_index_full'];


//****************************** parseTextData **************************
// Функция обработки запроса с текстовыми данными
var parseTextData = function(data, res, dictName) {
    var taTokens3 = tokenize(data).filter(findCorrectWord); //получаем массив с токенами на основе текста с исключением незначащих токенов
    //проводим процедуру стемминга
    for (var i = 0; i < taTokens3.length; i++) {
        if (taTokens3[i].length > 3) {
            if (isCyrillic(taTokens3[i]))
                taTokens3[i] = stemmer.stem(taTokens3[i]);
            else
                taTokens3[i] = stemmerEng.stem(taTokens3[i]);
        }
    }
    //taTokens3.push('.');
    //taTokens3.push('.');
    //taTokens3.push('.');
    //taTokens3.push('.');
    //taTokens3.push('.');
    var ress = findStemsInDict(taTokens3, arrHashDict[dictName]); //получаем хэш таблицу со словарными понятиями и их частотой
    var result = [];
    for (var key in ress) {
        result.push({
            word: key,
            frequency: ress[key]
        });
    }

    return result;
    ////var chartData=[];
    //var keysAndFreqs = new Array(keysRess.length);
    //for (i = 0; i < keysRess.length; i++) {
    //    keysAndFreqs[i] = new Array(2);
    //    keysAndFreqs[i][0] = keysRess[i];
    //    keysAndFreqs[i][1] = valuesRess[i];
    //}
    //// Сортировка по частоте
    //keysAndFreqs.sort(function(a, b) {
    //    if (a[1] < b[1]) return 1;
    //    else if (a[1] > b[1]) return -1;
    //    else return 0;
    //});
    //// Сортировка по частоте
    //valuesRess.sort(function(a, b) {
    //    return b - a;
    //});
    ///*res.render('result', {
    //    title: 'Tag Annotation Service',
    //    text1: data,
    //    pKeysOrigAndFreq: keysAndFreqs,
    //    tokenText1: taTokens3,
    //    chartData: valuesRess
    //});*/
    //
    //return keysRess;
};



//****************************** tokenize **************************
//функция для преобразования текста в массив с токенами
// вход текст
// выход массив токенов
function tokenize(str) {

    var punct = '\\[' + '\\!' + '\\"' + '\\#' + '\\$' + // since javascript does not
        '\\%' + '\\&' + '\\\'' + '\\(' + '\\)' + // support POSIX character
        '\\*' + '\\+' + '\\,' + '\\\\' + '\\-' + // classes, we'll need our
        '\\.' + '\\/' + '\\:' + '\\;' + '\\<' + // own version of [:punct:]
        '\\=' + '\\>' + '\\?' + '\\@' + '\\[' +
        '\\]' + '\\^' + '\\_' + '\\`' + '\\{' +
        '\\|' + '\\}' + '\\~' + '\\]',

        re = new RegExp( // tokenizer
            '\\s*' + // discard possible leading whitespace
            '(' + // start capture group #1
            '\\.{3}' + // ellipsis (must appear before punct)
            '|' + // alternator
            '[а-я\\w]+[\\-\\/\\\\][а-я\\w]+' +
            '|' + // alternator
            '\\w+\'(?:\\w+)?' + // compound words (must appear before punct)
            '|' + // alternator
            '\\w+\\’(?:\\w+)?' + // compound words (must appear before punct)
            '|' + // alternator
            '[а-я]+' + // other words
            '|' + // alternator
            '\\w+' + // other words
            '|' + // alternator
            '[' + punct + ']' + // punct
            ')', 'i'),
        tokens = str.split(re), // split string using tokenizing regex
        result = [];

    // add non-empty tokens to result
    for (var i = 0, len = tokens.length; i++ < len;) {
        if (tokens[i]) {
            result.push(tokens[i].toLowerCase());
        }
    }

    return result;

} // end tokenize()
