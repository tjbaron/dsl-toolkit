import { tokenize } from './tokenizer';

test('tokenize simple eq (1+1)', () => {
    const tokens = tokenize('1 + 1');
    expect(tokens).toStrictEqual([
        { type: 'number', token: '1' },
        { type: 'symbol', token: '+' },
        { type: 'number', token: '1' },
    ]);
});
