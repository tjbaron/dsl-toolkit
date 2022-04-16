# DSL Toolkit

A toolkit to create domain specific languages (DSL) and evaluate/execute them all within Javascript / Typescript.

## Roadmap

This tool is currently more of a concept than a working implementation! It is not ready for general use.

The first goal is to create a tokenizer that can:

- handle nesting
- tokenize a data stream (even if data is highly nested)
- successfully tokenize various data (assuming it is provided sufficient tokenization rules) such as:
    - Math expressions
    - JSON
    - YAML
    - XML
    - English
    - Japanese

Once the `tokenizer` is developed, I will attempt to implement a generic `evaluator` system. Ideally this
evaluator would be able to:

    - evaluate math/code style tokenized input and return a result
    - evaluate human language (statements) to build knowledge graphs
    - evaluate human language (questions) to to query a knowledge graph

## Usage

First you must initialize your Tokenizer, passing in a list of contexts. Each context contains an array of
functions that create specific token types. This is how you define the syntax/token types of your DSL.

Once your tokenizer is initialized, simply call the `tokenize` function to tokenize your string. Here is an
example:

```js
const contexts = {
    sentence: [
        (next) => {
            let token = '';
            while (true) {
                const c = next();
                if (c && c.match(/[a-zA-Z]/)) {
                    token += c;
                } else {
                    break;
                }
            }
            return token.length > 0 ? { type: 'word', token } : null;
        }
    ],
};

const tokenizer = new Tokenizer(contexts, 'sentence');
console.log(tokenizer.tokenize('Hello world'));
```
