import { englishTokenizer } from "./englishTokenizer";
import { readFileSync } from "fs"

test('Sentence: Hello world.', () => {
    const dict = readFileSync('./data/english/wordnet/wn-data-eng.tab', 'utf8');
    const tokenizer = englishTokenizer(dict);
    const res = tokenizer.tokenize('Hello eat.');
    expect(res).toStrictEqual([{
        "token": "Hello eat.", "type": "sentence",
        "subtokens": [
            {"token": "Hello", "type": "word"},
            {"token": "eat", "type": "verb"},
            {"token": ".", "type": "punctuation"},
        ],
    }]);
});
