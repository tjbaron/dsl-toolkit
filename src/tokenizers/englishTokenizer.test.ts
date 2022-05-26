import { englishTokenizer } from "./englishTokenizer";

test('Sentence: Hello world.', () => {
    const tokenizer = englishTokenizer();
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
