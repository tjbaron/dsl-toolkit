import { regexMatcher } from "./regex";

test('Regex: match', () => {
    const matcher = regexMatcher(/[a-zA-Z]/, 'word');
    const word = 'Hello world';
    let idx = 0;
    const token = matcher(() => word[idx++], () => []);
    expect(token).toStrictEqual({ type: 'word', token: 'Hello' });
});

test('Regex: not match', () => {
    const matcher = regexMatcher(/[a-zA-Z]/, 'word');
    const word = '1 Hello world';
    let idx = 0;
    const token = matcher(() => word[idx++], () => []);
    expect(token).toStrictEqual(null);
});
