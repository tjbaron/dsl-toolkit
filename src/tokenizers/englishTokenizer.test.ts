import { englishTokenizer } from "./englishTokenizer";

test('Sentence: Hello world.', () => {
    const tokenizer = englishTokenizer();
    const res = tokenizer.tokenize('Hello world.');
    expect(res).toStrictEqual([{
        "token": "Hello world.", "type": "sentence",
        "subtokens": [
            {"token": "Hello", "type": "word"},
            {"token": "world", "type": "word"},
            {"token": ".", "type": "punctuation"},
        ],
    }]);
});
