import { scopeMatcher } from "./scope";

test('Scope: valid', () => {
    const matcher = scopeMatcher('(', ')', 'scope', 'scope');
    const word = '(something))';
    let idx = 0;
    const token = matcher(() => word[idx++], () => []);
    expect(token).toStrictEqual({ type: 'scope', token: '(something)', subtokens: [] });
});

test('Scope: unclosed', () => {
    const matcher = scopeMatcher('<', '>', 'tag', 'tag');
    const word = '<something';
    let idx = 0;
    const token = matcher(() => word[idx++], () => []);
    expect(token).toStrictEqual(null);
});
