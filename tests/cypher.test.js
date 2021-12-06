import Cypher from "../src/js/cypher"

const cypher = new Cypher({
    "T": "+",
    "s": "^",
},{
    upperCase: true
});

const message = "This is the message.";

test ('replaces letter T with a plus',()=>{
    const coded = cypher.encode("Tt");
    expect(coded).toBe("++");
});

test ('can decode back to uppercase', ()=>{
    const coded = cypher.encode(message);
    const decode = cypher.decode(coded)
    expect(decode).toBe(message.toUpperCase());
});

test ('can produce an empty alphabet key', ()=> {
    const keyMap = Cypher.makeEmptyAlphaKeyMap()
    expect (Object.keys(keyMap)).toEqual(expect.arrayContaining(Cypher.alphabet))
})

test ('can produce an random alphabet key', ()=> {
    const keyMap = Cypher.makeRandomAlphaKeyMap()

    const keys = Object.keys(keyMap);
    const values =keys.map(key=>keyMap[key]);

    expect (keys.length).toEqual(Cypher.alphabet.length)
    expect (keys).toEqual(expect.arrayContaining(Cypher.alphabet))
    expect (values).toEqual(expect.arrayContaining(Cypher.alphabet))
})

test ('a random cypher can encode and decode back to the same message', ()=>{

    const cypher = new Cypher(Cypher.makeRandomAlphaKeyMap());
    const message = "This is our test message. It has punctuation!";

    const coded = cypher.encode(message);
    const decode = cypher.decode(coded)
    expect(decode).toBe(message.toUpperCase());

})