const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];


/**
 * Covert to uppercase, if a string
 * @param {any} input 
 * @returns The input, in uppercase if a string 
 */
function safeToUpperCase(input) {
    if (typeof input === 'string') {return input.toUpperCase()}
    return input
}

/**
 * Randomly rearrange the members of any array
 * @param {array} inputArray an array
 * @returns the input array with its members randomly rearranged
 */
function shuffleArray(inputArray) {
    const holdingPile = inputArray.splice(0,inputArray.length);
    let index;
    while (holdingPile.length > 0) {
        index = Math.floor(Math.random() * holdingPile.length);
        inputArray.push(...holdingPile.splice(index,1));
    }
    return inputArray;
}

/**
 * Pick a random member of any array, without changing the array.
 * @param {array} inputArray 
 * @returns a random member
 */
function pickRandomItemFrom(inputArray) {
    const index = Math.floor(Math.random() * inputArray.length);
    return inputArray[index]
}

export {
    alphabet,
    shuffleArray, safeToUpperCase, pickRandomItemFrom
}