import { englishGrammarTokenizer } from "./englishGrammarTokenizer";

test('Sentence: Hello world.', () => {
    const d = [
        {"token": "I", "type": "noun"},
        {"token": "eat", "type": "verb"},
        {"token": "food", "type": "noun"},
    ]
    const tokenizer = englishGrammarTokenizer();
    const res = tokenizer.tokenize(d);
    expect(res).toStrictEqual([
        {
            "token": "I", "type": "noun phrase"
        },
        {
            "token": "eat food", "type": "verb phrase"
        },
    ]);
});
