import Cypher from "../src/js/cypher"

const message = "This is the message.";

test('It can replace upper and lower case letters.', () => {
    const testPartialCypher = new Cypher({
        "T": "Z",
        "s": "X",
    }, {
        upperCase: true
    });
    const coded = testPartialCypher.encode("Tt");
    expect(coded).toBe("ZZ");
});

test('can decode back to uppercase', () => {
    const cypher = new Cypher(Cypher.makeRandomAlphaKeyMap());
    const coded = cypher.encode(message);
    const decode = cypher.decode(coded)
    expect(decode).toBe(message.toUpperCase());
});

test('can produce an empty alphabet key', () => {
    const keyMap = Cypher.makeEmptyAlphaKeyMap()
    expect(Object.keys(keyMap)).toEqual(expect.arrayContaining(Cypher.alphabet))
})

test('can produce an random alphabet key', () => {
    const keyMap = Cypher.makeRandomAlphaKeyMap()

    const keys = Object.keys(keyMap);
    const values = keys.map(key => keyMap[key]);

    expect(keys.length).toEqual(Cypher.alphabet.length)
    expect(keys).toEqual(expect.arrayContaining(Cypher.alphabet))
    expect(values).toEqual(expect.arrayContaining(Cypher.alphabet))
})

test('a random cypher can encode a message with punctuation and decode back to uppercase version of the message.', () => {

    const cypher = new Cypher(Cypher.makeRandomAlphaKeyMap());
    const message = "This is our test message. It has punctuation!";

    const coded = cypher.encode(message);
    const decode = cypher.decode(coded)
    expect(decode).toBe(message.toUpperCase());

})

test('an empty cypher can be used to decode without breaking, but will not change the letters.', () => {
    const emptyCypher = new Cypher(Cypher.makeEmptyAlphaKeyMap());
    expect(emptyCypher.decode(message)).toBe(message.toUpperCase());
})