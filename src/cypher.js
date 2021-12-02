
class Cypher {
    /**
     * 
     * @param {{[index:string]:string}} keyMap 
     */
    constructor(keyMap) {
        this.keyMap = keyMap;
    }

    get reversedKeyMap() {
        const reversed = {};
        for (const key in this.keyMap) {
            reversed[this.keyMap[key]] = key;
        }
        return reversed;
    }

    /**
     * Encode a message
     * @param {string} text the message to encode
     * @return the encoded string
     */
    encode(text) {
        const letters = text.split('')
        const encodedLetters = letters.map(letter => {
            return this.keyMap[letter] || letter
        })
        return encodedLetters.join('')
    }

    /**
     * Decode an encoded string
     * @param {string} encodedText 
     * @return the decoded string
     */
    decode(text) {
        const encodedLetters = text.split('');
        const { reversedKeyMap } = this;
        const decodedLetters = encodedLetters.map(letter => {
            return reversedKeyMap[letter] || letter
        })
        return decodedLetters.join('')
    }

    check() {
        return Cypher.checkKeyMap(this.keyMap);
    }

    /**
     * check if an obect is a suitable keyMap
     * @param {{[index:string]:string}} keyMap 
     * @return a let of issuses with the keyMap
     */
    static checkKeyMap(keyMap) {
        const issues = [];

        const values = [], duplicates = [];
        for (const key in keyMap) {
            let value = keyMap[key];
            if (values.includes(value) && !duplicates.includes(value)) {
                duplicates.push(value)
            }
            values.push(value)
        }

        if (duplicates.length > 0) {
            issues.push (`Duplicate values: [${duplicates.join(', ')}]`)
        }

        return issues;
    }
}

module.exports = Cypher

