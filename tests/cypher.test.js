const  Cypher =  require ("../src/cypher");

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