const state = {
    emojis: new Map([
        ['GOOD', '😁'],
        ['NOT_BAD', '🙂'],
        ['BAD', '😟'],
      ]),
};

export default {
    namespaced: true,
    state,
};