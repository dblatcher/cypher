import { alphabet, shuffleArray, safeToUpperCase } from "./utility"

class Cypher {
    /**
     * @param {{[index:string]:string|undefined}} keyMap 
     * @param {{upperCase:boolean}} config
     */
    constructor(keyMap, config = undefined) {
        this.keyMap = keyMap;
        this.config = config || Object.assign({}, Cypher.defaultConfig)
    }

    static defaultConfig = {
        upperCase: true
    }

    static alphabet = alphabet

    get reversedKeyMap() {
        const reversed = {};
        let convertCharacter = character=>character;
        if (this.config.upperCase) {
            convertCharacter = character => safeToUpperCase(character)
        } 

        for (const key in this.keyMap) {
            const value = convertCharacter(this.keyMap[key]);
            reversed[value] = convertCharacter(key);
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
        const characters = text.split('')
        const encodedCharacters = characters.map(character => {
            let matchingValue = keyMap[character];
            if (config.upperCase && !matchingValue) {
                matchingValue = keyMap[character.toLowerCase()];
            }
            if (matchingValue) { return matchingValue }
            return character
        })
        return encodedCharacters.join('')
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

        const encodedCharacters = text.split('');

        const decodedCharacters = encodedCharacters.map(character => {
            let matchingValue = reversedKeyMap[character]
            if (matchingValue) { return matchingValue }
            return character
        })
        return decodedCharacters.join('')
    }

    check() {
        return Cypher.checkKeyMap(this.keyMap);
    }

    /**
     * check if an obect is a suitable keyMap
     * @param {{[index:string]:string}} keyMap 
     * @return a list of issues with the keyMap
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

    static makeEmptyAlphaKeyMap() {
        const keyMap = {};
        this.alphabet.forEach(letter => keyMap[letter] = undefined)
        return keyMap
    }

    static makeRandomAlphaKeyMap() {
        const keyMap = this.makeEmptyAlphaKeyMap();
        const letters = shuffleArray([...this.alphabet])

        Object.keys(keyMap).forEach(key => {
            keyMap[key] = letters.pop();
        })

        return keyMap;
    }
}

export default Cypher

