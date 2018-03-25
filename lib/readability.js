/*jshint esversion: 6 */
import {memoized} from '../lib/es6-functional.js'
    
var fs = require('fs')
var path = require('path')

//functions
const readDocument = (filename) => {
    return fs.readFileSync(path.join(__dirname, filename))
        .toString().replace(/["']/g,'').toLowerCase()
}
//returns an array of words
//string --> [string]
const splitWords = (text) => {
    return text.split(/[\s.,/:\n]+/).filter(Boolean)
}
const splitSentences = (text) => {
    return text.split(/[.\r\n]+/).filter(Boolean)
}
const countSyllablesWord = memoized((word) => { 
    const syllables = word.match(/[eayiou]/g) 
    const count = (syllables != null)? word.match(/[eayiou]/g).length: 0
    return ((count>0?count:1))
})
const countSyllables = (words) => {
    const countSyllablesHelper = (n,count) => {
        if (n < 0) return count
        return countSyllablesHelper(n-1, 
            count + 
                (countSyllablesWord(words[n] //avoid blank words
                    .replace(/[ayiou][eayiou][eayiou]|[ayiou][eayiou]/g,'i')
                    .replace(/ise|ize|ive|ice|ure|ance|ince|are/g,'i')
                    .replace(/e[eayiou]/g,'e')
                    .replace(/ed$/g,'e')
                    .replace(/e$/, ''))))
    }
    return countSyllablesHelper(words.length - 1,0)
}
const fleschIndex = (sentences, words, syllables) => {
    words = (words)?words:1
    sentences = (sentences)?sentences:1
    const index = 206.835 - (84.6 * (syllables/words) - (1.015 - (words/sentences)))
    return (index < 0)?0:((index > 100)?100:index)
}

const analyseDocument = (filename) => {
    const document = readDocument(filename)
    const words = splitWords(document)
    const sentences = splitSentences(document).filter(sentence => sentence !== '')
    const syllables = countSyllables(words)
    return {
        sentences: sentences.length,
        words: words.length,
        syllables: syllables,
        index: fleschIndex(sentences.length, words.length, syllables)}
}
 
export {analyseDocument}