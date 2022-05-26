import { Tokenizer } from "../tokenizer";
import { regexMatcher } from "../tokenMatchers/regex";
import { untilMatcher } from "../tokenMatchers/until";
import { TokenMatcher } from "../types";

const parseWordnet = (data: string) => {
    const res: {[key: string]: string} = {};
    data.split('\n').filter((e) => {
        return e && e[0] !== '#'
    }).forEach((e) => {
        const [synset, part, word] = e.split('\t');
        res[word] = {
            a: 'adjective',
            v: 'verb',
            n: 'noun',
            r: 'adverb',
            u: 'unknown',
        }[synset[9] || 'u'] || 'unknown';
    });
    return res;
};

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

export const englishTokenizer = (dictString: string) => {
    const dict = parseWordnet(dictString);
    return new Tokenizer({
        paragraph: [untilMatcher('.', 'sentence', 'sentence', true)],
        sentence: [
            wordLookup(dict),
            regexMatcher(/[\.!?,'":()]/, 'punctuation'),
        ],
    }, 'paragraph');
};
