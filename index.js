const  Cypher =  require ("./src/cypher");

cypher = new Cypher({
    "e": "+",
    "s": "^",
});

const message = "This is my message.";

const encoded = cypher.encode(message);
const decoded = cypher.decode(encoded);

console.log({ message, encoded, decoded })

console.log('errors', cypher.check());