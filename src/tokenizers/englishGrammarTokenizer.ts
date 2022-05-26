import { Tokenizer } from "../tokenizer";
import { Token, TokenMatcher } from "../types";

export const phraseMatcher = (): TokenMatcher => {
    return (next, tokenize) => {
        let token: Token[] = [];
        let type = 'unknown'
        while (true) {
            const c = next();
            if (c !== null) {
                if (c.type === 'noun') {
                    if (type !== 'verb phrase') {
                        type = 'noun phrase';
                    }
                }
                if (c.type === 'verb') {
                    if (type === 'noun phrase') {
                        break;
                    }
                    type = 'verb phrase';
                }
                token.push(c);
                continue;
            }
            break;
        }
        if (token.length === 0) return null;
        return { 
            token: token.map((t) => t.token).join(' '),
            type,
        };
    };
};

export const englishGrammarTokenizer = () => {
    return new Tokenizer({
        sentence: [
            phraseMatcher(),
        ],
    }, 'sentence');
};
