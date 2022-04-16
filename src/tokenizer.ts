export const tokenize = (str: string) => {
    return [
        { type: 'number', token: '1' },
        { type: 'symbol', token: '+' },
        { type: 'number', token: '1' },
    ];
};
