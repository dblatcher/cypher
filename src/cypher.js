
class Cypher {
    /**
     * @param {{[index:string]:string}} keyMap 
     * @param {{upperCase:boolean}} config
     */
    constructor(keyMap, config = undefined) {
        this.keyMap = keyMap;
        this.config = config || Object.assign({}, Cypher.defaultConfig)
    }

    static defaultConfig = {
        upperCase: true
    }

    get reversedKeyMap() {
        const reversed = {};
        if (this.config.upperCase) {
            for (const key in this.keyMap) {
                reversed[this.keyMap[key].toUpperCase()] = key.toUpperCase();
            }
        } else {
            for (const key in this.keyMap) {
                reversed[this.keyMap[key]] = key;
            }
        }
        return reversed;
    }

    /**
     * Encode a message
     * @param {string} text the message to encode
     * @return the encoded string
     */
    encode(text) {
        const { keyMap, config } = this;
        if (config.upperCase) {
            text = text.toUpperCase();
        }
        const letters = text.split('')
        const encodedLetters = letters.map(letter => {
            let matchingValue = keyMap[letter];
            if (config.upperCase && !matchingValue) {
                matchingValue = keyMap[letter.toLowerCase()];
            }
            return matchingValue || letter
        })
        return encodedLetters.join('')
    }

    /**
     * Decode an encoded string
     * @param {string} encodedText 
     * @return the decoded string
     */
    decode(text) {

        const { reversedKeyMap, config } = this;
        if (config.upperCase) {
            text = text.toUpperCase();
        }

        const encodedLetters = text.split('');

        const decodedLetters = encodedLetters.map(letter => {
            let matchingValue = reversedKeyMap[letter]
            return matchingValue || letter
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
            issues.push(`Duplicate values: [${duplicates.join(', ')}]`)
        }

        return issues;
    }
}

module.exports = Cypher

