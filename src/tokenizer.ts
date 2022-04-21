import { Contexts, Token } from "./types";

export class Tokenizer {
    constructor(private contexts: Contexts, private defaultContext: any) {}

    tokenize = (str: string, ctx?: string) => {
        const tokenFns = (ctx && this.contexts[ctx]) || this.contexts[this.defaultContext];
        const tokens: Token[] = [];
        let i = 0;
        while (i < str.length) {
            for (const fn of tokenFns) {
                let j = i;
                const res = fn(() => {
                    j++;
                    return str[j - 1] || null;
                }, this.tokenize);
                if (res) {
                    i += res.token.length - 1;
                    tokens.push(res);
                    break;
                }
            }
            i++;
        }
        return tokens;
    };
}
