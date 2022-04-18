import { Token, TokenMatcher } from '../tokenizer';

type RegexMatcher = (end: string, type: string, scope: string) => TokenMatcher;

export const untilMatcher: RegexMatcher = (end, type, scope) => {
    return (next, tokenize) => {
        let token = '';
        while (true) {
            const c = next();
            if (c !== null && !token.endsWith(end)) {
                token += c;
                continue;
            }
            break;
        }
        if (token.length === 0) return null;
        const res: Token = { token, type };
        if (scope) {
            res.subtokens = tokenize(token.slice(0, -end.length), scope);
        }
        return res;
    };
};
