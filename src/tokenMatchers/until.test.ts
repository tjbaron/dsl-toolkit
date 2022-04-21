import { untilMatcher } from "./until";

test('Until: valid', () => {
    const matcher = untilMatcher(' ', 'word', 'word');
    const word = 'Test string';
    let idx = 0;
    const token = matcher(() => word[idx++], () => []);
    expect(token).toStrictEqual({ type: 'word', token: 'Test ', subtokens: [] });
});
