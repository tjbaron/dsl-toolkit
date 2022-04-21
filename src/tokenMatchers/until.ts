import { Token, TokenMatcher } from '../types';

type RegexMatcher = (end: string, type: string, scope: string, includeMatch?: boolean) => TokenMatcher;

export const untilMatcher: RegexMatcher = (end, type, scope, includeMatch=false) => {
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
            res.subtokens = tokenize(includeMatch ? token : token.slice(0, -end.length), scope);
        }
        return res;
    };
};
