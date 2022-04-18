import { TokenMatcher } from '../tokenizer';

type RegexMatcher = (reg: RegExp, type: string) => TokenMatcher;

export const regexMatcher: RegexMatcher = (reg, type) => {
    return (next) => {
        let token = '';
        while (true) {
            const c = next();
            if (c !== null && c.match(reg)) {
                token += c;
                continue;
            }
            break;
        }
        if (token.length === 0) return null;
        return { token, type };
    };
};
