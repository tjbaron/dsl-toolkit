import { Token, TokenMatcher } from '../tokenizer';

type ScopeMatcher = (open: string, close: string, type: string, scope: string) => TokenMatcher;

export const scopeMatcher: ScopeMatcher = (open, close, type, scope) => {
    return (next, tokenize) => {
        let c = next();
        if (c !== open) return null;
        let closureCount = 1;
        let token = c;
        while (true) {
            c = next();
            if (c === null) return null;
            token += c;
            if (c === open) closureCount++;
            else if (c === close) closureCount--;
            if (closureCount === 0) {
                const res: Token = {
                    type: 'scope',
                    token,
                };
                if (scope) {
                    res.subtokens = tokenize(token.slice(1, -1), scope);
                }
                return res;
            }
        }
    };
};
