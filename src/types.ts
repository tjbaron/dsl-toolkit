
export type NextFn = () => string | null;

export type TokenizeFn = (str: string, ctx?: string) => Token[];

export type TokenMatcher = (next: NextFn, tokenize: TokenizeFn) => Token | null;

export type Token = { type: string; token: string; subtokens?: Token[] };

export interface Contexts {
    [key: string]: TokenMatcher[];
}
