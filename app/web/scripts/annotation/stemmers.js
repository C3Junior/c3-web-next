/*
 Copyright (c) 2012, Polyakov Vladimir, Chris Umbel
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

var PorterStemmerRu = {};

function attemptReplacePatterns(token, patterns) {
    var replacement = null;
    var i = 0,
        isReplaced = false;
    while ((i < patterns.length) && !isReplaced) {
        if (patterns[i][0].test(token)) {
            replacement = token.replace(patterns[i][0], patterns[i][1]);
            isReplaced = true;
        }
        i++;
    }
    return replacement;
}

function perfectiveGerund(token) {
    var result = attemptReplacePatterns(token, [
        [/[ая]в(ши|шись)$/g, ''],
        [/(ив|ивши|ившись|ывши|ывшись|ыв)$/g, '']
    ]);
    return result;
}

function adjectival(token) {
    var result = adjective(token);
    if (result !== null) {
        var pariticipleResult = participle(result);
        result = pariticipleResult ? pariticipleResult : result;
    }
    return result;
}

function adjective(token) {
    var result = attemptReplacePatterns(token, [
        [/(ее|ие|ые|ое|ими|ыми|ей|ий|ый|ой|ем|им|ым|ом|его|ого|ему|ому|их|ых|ую|юю|ая|яя|ою|ею)$/g, '']
    ]);
    return result;
}

function participle(token) {
    var result = attemptReplacePatterns(token, [
        [/([ая])(ем|нн|вш|ющ|щ)$/g, '$1'],
        [/(ивш|ывш|ующ)$/g, '']
    ]);
    return result;
}

function reflexive(token) {
    var result = attemptReplacePatterns(token, [
        [/(ся|сь)$/g, '']
    ]);
    return result;
}

function verb(token) {
    var result = attemptReplacePatterns(token, [
        [/([ая])(ла|на|ете|йте|ли|й|л|ем|н|ло|но|ет|ют|ны|ть|ешь|нно)$/g, '$1'],
        [/(ила|ыла|ена|ейте|уйте|ите|или|ыли|ей|уй|ил|ыл|им|ым|ен|ило|ыло|ено|ят|ует|ит|ыт|ены|ить|ыть|ишь|ую|ю)$/g, '']
    ]);
    return result;
}

function noun(token) {
    var result = attemptReplacePatterns(token, [
        [/(а|ев|ов|ие|ье|е|иями|ями|ами|еи|ии|и|ией|ей|ой|ий|й|иям|ям|ием|ем|ам|ом|о|у|ах|иях|ях|ы|ь|ию|ью|ю|ия|ья|я)$/g, '']
    ]);
    return result;
}

function superlative(token) {
    var result = attemptReplacePatterns(token, [
        [/(ейш|ейше)$/g, '']
    ]);
    return result;
}

function derivational(token) {
    var result = attemptReplacePatterns(token, [
        [/(ост|ость)$/g, '']
    ]);
    return result;
}

// perform full stemming algorithm on a single word
PorterStemmerRu.stem = function(token) {
    token = token.toLowerCase().replace(/ё/g, 'е');
    var volwesRegexp = /^(.*?[аеиоюяуыиэ])(.*)$/g;
    var RV = volwesRegexp.exec(token);
    if (!RV || RV.length < 3) {
        return token;
    }
    var head = RV[1];
    RV = RV[2];
    volwesRegexp.lastIndex = 0;
    var R2 = volwesRegexp.exec(RV);
    var result = perfectiveGerund(RV);
    if (result === null) {
        var resultReflexive = reflexive(RV) || RV;
        result = adjectival(resultReflexive);
        if (result === null) {
            result = verb(resultReflexive);
            if (result === null) {
                result = noun(resultReflexive);
                if (result === null) {
                    result = resultReflexive;
                }
            }
        }
    }
    result = result.replace(/и$/g, '');
    var derivationalResult = result;
    if (R2 && R2[2]) {
        derivationalResult = derivational(R2[2]);
        if (derivationalResult !== null) {
            derivationalResult = derivational(result);
        } else {
            derivationalResult = result;
        }
    }

    var superlativeResult = superlative(derivationalResult) || derivationalResult;

    superlativeResult = superlativeResult.replace(/(н)н/g, '$1');
    superlativeResult = superlativeResult.replace(/ь$/g, '');
    return head + superlativeResult;
};

/*
 Copyright (c) 2011, Chris Umbel
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

// denote groups of consecutive consonants with a C and consecutive vowels
// with a V.
function categorizeGroups(token) {
    return token.replace(/[^aeiouy]+y/g, 'CV').replace(/[aeiou]+/g, 'V').replace(/[^V]+/g, 'C');
}

// denote single consonants with a C and single vowels with a V
function categorizeChars(token) {
    return token.replace(/[^aeiouy]y/g, 'CV').replace(/[aeiou]/g, 'V').replace(/[^V]/g, 'C');
}

// calculate the "measure" M of a word. M is the count of VC sequences dropping
// an initial C if it exists and a trailing V if it exists.
function measure(token) {
    if (!token)
        return -1;

    return categorizeGroups(token).replace(/^C/, '').replace(/V$/, '').length / 2;
}

// determine if a token end with a double consonant i.e. happ
function endsWithDoublCons(token) {
    return token.match(/([^aeiou])\1$/);
}

// replace a pattern in a word. if a replacement occurs an optional callback
// can be called to post-process the result. if no match is made NULL is
// returned.
function attemptReplace(token, pattern, replacement, callback) {
    var result = null;

    if ((typeof pattern == 'string') && token.substr(0 - pattern.length) == pattern)
        result = token.replace(new RegExp(pattern + '$'), replacement);
    else if ((pattern instanceof RegExp) && token.match(pattern))
        result = token.replace(pattern, replacement);

    if (result && callback)
        return callback(result);
    else
        return result;
}

// attempt to replace a list of patterns/replacements on a token for a minimum
// measure M.
function attemptReplacePatterns(token, replacements, measureThreshold) {
    var replacement = token;

    for (var i = 0; i < replacements.length; i++) {
        if (measureThreshold === null || measure(attemptReplace(token, replacements[i][0], replacements[i][1])) > measureThreshold) {
            replacement = attemptReplace(replacement, replacements[i][0], replacements[i][2]) || replacement;
        }
    }

    return replacement;
}

// replace a list of patterns/replacements on a word. if no match is made return
// the original token.
function replacePatterns(token, replacements, measureThreshold) {
    return attemptReplacePatterns(token, replacements, measureThreshold) || token;
}

// TODO: this should replace all of the messy replacement stuff above
function replaceRegex(token, regex, includeParts, minimumMeasure) {
    var parts;
    var result = '';

    if (regex.test(token)) {
        parts = regex.exec(token);

        includeParts.forEach(function(i) {
            result += parts[i];
        });
    }

    if (measure(result) > minimumMeasure) {
        return result;
    }

    return null;
}

// step 1a as defined for the porter stemmer algorithm.
function step1a(token) {
    if (token.match(/(ss|i)es$/)) {
        return token.replace(/(ss|i)es$/, '$1');
    }

    if (token.substr(-1) == 's' && token.substr(-2, 1) != 's' && token.length > 2) {
        return token.replace(/s?$/, '');
    }

    return token;
}

// step 1b as defined for the porter stemmer algorithm.
function step1b(token) {
    if (token.substr(-3) == 'eed') {
        if (measure(token.substr(0, token.length - 3)) > 0)
            return token.replace(/eed$/, 'ee');
    } else {
        var result = attemptReplace(token, /(ed|ing)$/, '', function(token) {
            if (categorizeGroups(token).indexOf('V') >= 0) {
                result = attemptReplacePatterns(token, [
                    ['at', '', 'ate'],
                    ['bl', '', 'ble'],
                    ['iz', '', 'ize']
                ]);

                if (result != token) {
                    return result;
                } else {
                    if (endsWithDoublCons(token) && token.match(/[^lsz]$/)) {
                        return token.replace(/([^aeiou])\1$/, '$1');
                    }

                    if (measure(token) == 1 && categorizeChars(token).substr(-3) == 'CVC' && token.match(/[^wxy]$/)) {
                        return token + 'e';
                    }
                }

                return token;
            }

            return null;
        });

        if (result) {
            return result;
        }
    }

    return token;
}

// step 1c as defined for the porter stemmer algorithm.
function step1c(token) {
    var categorizedGroups = categorizeGroups(token);

    if (token.substr(-1) == 'y' && categorizedGroups.substr(0, categorizedGroups.length - 1).indexOf('V') > -1) {
        return token.replace(/y$/, 'i');
    }

    return token;
}

// step 2 as defined for the porter stemmer algorithm.
function step2(token) {
    token = replacePatterns(token, [
        ['ational', '', 'ate'],
        ['tional', '', 'tion'],
        ['enci', '', 'ence'],
        ['anci', '', 'ance'],
        ['izer', '', 'ize'],
        ['abli', '', 'able'],
        ['bli', '', 'ble'],
        ['alli', '', 'al'],
        ['entli', '', 'ent'],
        ['eli', '', 'e'],
        ['ousli', '', 'ous'],
        ['ization', '', 'ize'],
        ['ation', '', 'ate'],
        ['ator', '', 'ate'],
        ['alism', '', 'al'],
        ['iveness', '', 'ive'],
        ['fulness', '', 'ful'],
        ['ousness', '', 'ous'],
        ['aliti', '', 'al'],
        ['iviti', '', 'ive'],
        ['biliti', '', 'ble'],
        ['logi', '', 'log']
    ], 0);

    return token;
}

// step 3 as defined for the porter stemmer algorithm.
function step3(token) {
    return replacePatterns(token, [
        ['icate', '', 'ic'],
        ['ative', '', ''],
        ['alize', '', 'al'],
        ['iciti', '', 'ic'],
        ['ical', '', 'ic'],
        ['ful', '', ''],
        ['ness', '', '']
    ], 0);
}

// step 4 as defined for the porter stemmer algorithm.
function step4(token) {
    return replaceRegex(token, /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/, [1], 1) ||
        replaceRegex(token, /^(.+?)(s|t)(ion)$/, [1, 2], 1) ||
        token;
}

// step 5a as defined for the porter stemmer algorithm.
function step5a(token) {
    var m = measure(token.replace(/e$/, ''));



    if (m > 1 || (m == 1 && !(categorizeChars(token).substr(-4, 3) == 'CVC' && token.match(/[^wxy].$/)))) {
        token = token.replace(/e$/, '');
    }

    return token;
}

// step 5b as defined for the porter stemmer algorithm.
function step5b(token) {
    if (measure(token) > 1) {
        return token.replace(/ll$/, 'l');
    }

    return token;
}

var PorterStemmer = {};

// perform full stemming algorithm on a single word
PorterStemmer.stem = function(token) {
    if (token.length < 3) return token;
    return step5b(step5a(step4(step3(step2(step1c(step1b(step1a(token.toLowerCase())))))))).toString();
};
