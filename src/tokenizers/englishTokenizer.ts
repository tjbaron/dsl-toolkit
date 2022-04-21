import { Tokenizer } from "../tokenizer";
import { regexMatcher } from "../tokenMatchers/regex";
import { untilMatcher } from "../tokenMatchers/until";

export const englishTokenizer = () => {
    return new Tokenizer({
        paragraph: [untilMatcher('.', 'sentence', 'sentence', true)],
        sentence: [
            regexMatcher(/[a-zA-Z]/, 'word'),
            regexMatcher(/[\.!?,'":()]/, 'punctuation'),
        ],
    }, 'paragraph');
};
