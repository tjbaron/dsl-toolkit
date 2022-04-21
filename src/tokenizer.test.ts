import { Tokenizer } from './tokenizer';
import { regexMatcher } from './tokenMatchers/regex';
import { scopeMatcher } from './tokenMatchers/scope';
import { untilMatcher } from './tokenMatchers/until';
import { Contexts } from './types';

const englishContexts: Contexts = {
    paragraph: [untilMatcher('.', 'sentence', 'sentence')],
    sentence: [regexMatcher(/[a-zA-Z]/, 'word')],
};

const mathContexts: Contexts = {
    equation: [
        scopeMatcher('(', ')', 'scope', 'equation'),
        regexMatcher(/[a-zA-Z]/, 'var'),
        regexMatcher(/[0-9]/, 'number'),
        regexMatcher(/[\+\-\*\/]/, 'symbol'),
    ],
};

test('English: Hello world', () => {
    const tokenizer = new Tokenizer(englishContexts, 'sentence');
    const tokens = tokenizer.tokenize('Hello world');
    expect(tokens).toStrictEqual([
        { type: 'word', token: 'Hello' },
        { type: 'word', token: 'world' },
    ]);
});

test('English: I eat. You ate.', () => {
    const tokenizer = new Tokenizer(englishContexts, 'paragraph');
    const tokens = tokenizer.tokenize('I eat. You ate.');
    expect(tokens).toStrictEqual([
        {
            type: 'sentence',
            token: 'I eat.',
            subtokens: [
                { type: 'word', token: 'I' },
                { type: 'word', token: 'eat' },
            ],
        },
        {
            type: 'sentence',
            token: ' You ate.',
            subtokens: [
                { type: 'word', token: 'You' },
                { type: 'word', token: 'ate' },
            ],
        },
    ]);
});

test('Math: a + 1', () => {
    const tokenizer = new Tokenizer(mathContexts, 'equation');
    const tokens = tokenizer.tokenize('a + 1');
    expect(tokens).toStrictEqual([
        { type: 'var', token: 'a' },
        { type: 'symbol', token: '+' },
        { type: 'number', token: '1' },
    ]);
});

test('Math: 3+(2/2)', () => {
    const tokenizer = new Tokenizer(mathContexts, 'equation');
    const tokens = tokenizer.tokenize('3+(2/2)');
    expect(tokens).toStrictEqual([
        { type: 'number', token: '3' },
        { type: 'symbol', token: '+' },
        {
            type: 'scope',
            token: '(2/2)',
            subtokens: [
                { type: 'number', token: '2' },
                { type: 'symbol', token: '/' },
                { type: 'number', token: '2' },
            ],
        },
    ]);
});

test('Math: 1+(1+(1+1))', () => {
    const tokenizer = new Tokenizer(mathContexts, 'equation');
    const tokens = tokenizer.tokenize('1+(1+(1+1))');
    expect(tokens).toStrictEqual([
        { type: 'number', token: '1' },
        { type: 'symbol', token: '+' },
        {
            type: 'scope',
            token: '(1+(1+1))',
            subtokens: [
                { type: 'number', token: '1' },
                { type: 'symbol', token: '+' },
                {
                    type: 'scope',
                    token: '(1+1)',
                    subtokens: [
                        { type: 'number', token: '1' },
                        { type: 'symbol', token: '+' },
                        { type: 'number', token: '1' },
                    ],
                },
            ],
        },
    ]);
});
