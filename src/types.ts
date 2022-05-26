
export type NextFn = () => any;

export type TokenizeFn = (str: any, ctx?: string) => Token[];

export type TokenMatcher = (next: NextFn, tokenize: TokenizeFn) => Token | null;

export type Token = { type: string; token: any; subtokens?: Token[] };

export interface Contexts {
    [key: string]: TokenMatcher[];
}
