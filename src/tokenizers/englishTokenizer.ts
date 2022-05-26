import { Tokenizer } from "../tokenizer";
import { regexMatcher } from "../tokenMatchers/regex";
import { untilMatcher } from "../tokenMatchers/until";
import { TokenMatcher } from "../types";

const wordLookup = (dict: any): TokenMatcher => {
    return (next) => {
        const wordFinder = regexMatcher(/[a-zA-Z]/, 'word');
        const word = wordFinder(next, (s) => []);
        if (word) {
            const type = dict[word.token] || word.type;
            return { token: word.token, type };
        }
        return null;
    };
};

export const englishTokenizer = () => {
    const exampleDict = {'run': 'verb', 'eat': 'verb'};
    return new Tokenizer({
        paragraph: [untilMatcher('.', 'sentence', 'sentence', true)],
        sentence: [
            wordLookup(exampleDict),
            regexMatcher(/[\.!?,'":()]/, 'punctuation'),
        ],
    }, 'paragraph');
};
