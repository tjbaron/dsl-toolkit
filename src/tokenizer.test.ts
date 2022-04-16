import { Tokenizer, Contexts } from './tokenizer';

test('English: Hello world', () => {
    const tokenizer = new Tokenizer(
        {
            sentence: [
                (next) => {
                    let token = '';
                    while (true) {
                        const c = next();
                        if (c && c.match(/[a-zA-Z]/)) {
                            token += c;
                        } else {
                            break;
                        }
                    }
                    return token.length > 0 ? { type: 'word', token } : null;
                },
            ],
        },
        'sentence',
    );
    const tokens = tokenizer.tokenize('Hello world');
    console.log(tokens);
    expect(tokens).toStrictEqual([
        { type: 'word', token: 'Hello' },
        { type: 'word', token: 'world' },
    ]);
});

const contexts: Contexts = {
    equation: [
        (next, tokenize) => {
            let c = next();
            if (c !== '(') return null;
            let closureCount = 1;
            let token = c;
            while (true) {
                c = next();
                if (c === null) return null;
                token += c;
                if (c === '(') closureCount++;
                else if (c === ')') closureCount--;
                if (closureCount === 0)
                    return {
                        type: 'scope',
                        token,
                        subtokens: tokenize(token.slice(1, -1), 'equation'),
                    };
            }
            return null;
        },
        (next) => {
            let c = next();
            let token = '';
            while (c !== null && c.match(/[a-zA-Z]/)) {
                token += c;
                c = next();
            }
            return token ? { type: 'var', token } : null;
        },
        (next) => {
            let c = next();
            let token = '';
            while (c !== null && c.match(/[0-9]/)) {
                token += c;
                c = next();
            }
            return token ? { type: 'number', token } : null;
        },
        (next) => {
            let c = next();
            let token = '';
            while (c !== null && c.match(/[\+\-\*\/]/)) {
                token += c;
                c = next();
            }
            return token ? { type: 'symbol', token } : null;
        },
    ],
};

test('Math: a + 1', () => {
    const tokenizer = new Tokenizer(contexts, 'equation');
    const tokens = tokenizer.tokenize('a + 1');
    expect(tokens).toStrictEqual([
        { type: 'var', token: 'a' },
        { type: 'symbol', token: '+' },
        { type: 'number', token: '1' },
    ]);
});

test('Math: 3+(2/2)', () => {
    const tokenizer = new Tokenizer(contexts, 'equation');
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
