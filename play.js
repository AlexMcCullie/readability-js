import {analyseDocument}
        from '../lib/readability.js'

const print = (arg, showValue = true) => {
  if (showValue && typeof(arg) === "function")
      console.log(arg());
  else
      console.log(arg);
}

var analysis = analyseDocument('../docs/3syllable.txt');

//output results
print("3syllable.txt")
print("Sentences: " + analysis.sentences)
print("Words: " + analysis.words)
print("Syllables: " + analysis.syllables)
print("Index: " + analysis.index.toFixed(2))
print("-------------------")
var analysis1 = analyseDocument('../docs/sample.txt');
//output results
print("sample.txt")
print("Sentences: " + analysis1.sentences)
print("Words: " + analysis1.words)
print("Syllables: " + analysis1.syllables)
print("Index: " + analysis1.index.toFixed(2))

/*
100.00-90.00	5th grade	Very easy to read. Easily understood by an average 11-year-old student.
90.0–80.0	6th grade	Easy to read. Conversational English for consumers.
80.0–70.0	7th grade	Fairly easy to read.
70.0–60.0	8th & 9th grade	Plain English. Easily understood by 13- to 15-year-old students.
60.0–50.0	10th to 12th grade	Fairly difficult to read.
50.0–30.0	College	Difficult to read.
30.0–0.0	College graduate	Very difficult to read. Best understood by university graduates.
*/